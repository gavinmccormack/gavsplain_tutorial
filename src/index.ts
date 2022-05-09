import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { VerseResolver } from "./resolvers/verse";
import { UserResolver } from "./resolvers/user";
import * as redis from "redis"
// NB: Diff between import * as, and normal imp
import session from "express-session"
import connectRedis from 'connect-redis'
// NB: Playground deprecated in favour of sandbox. This plugin re-enables
// it. Running requests through apollo domain is a hassle for security.
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';


const main = async () => {
    const orm = await MikroORM.init()
    await orm.getMigrator().up()
    const app = express()


    const RedisStore = connectRedis(session)
    const redisClient = await redis.createClient()


    app.use( // NB: Client has TTL and 'touch' options
        session({
            name: 'gavsplain.sid',
            store: new RedisStore(<any>{ client: redisClient , options: {
                disableTouch: true
            }}),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
                httpOnly: true,
                secure: __prod__,
                sameSite: 'lax',
            },
            saveUninitialized: false, // NB: Check
            secret: "Wooooooooooooooooo", // NB: env var 
            resave: false,
        })   
    )
    // "Any"ing the options because it's less dumb than writing
    // twisty factory functions to make it seem like typescript works

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, VerseResolver, UserResolver],
            validate: false
        }),
        plugins: [ ApolloServerPluginLandingPageGraphQLPlayground() ],
        context: ({req, res}) => ({ em: orm.em, req, res })
    })

    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true
    }

    await apolloServer.start() // NB: Check
    apolloServer.applyMiddleware({app, cors: corsOptions, path: "/graphql"})

    app.listen(4000, () => {
        console.log("Server started on localhost:4000")
    })
}


main().catch((err)=> {
    console.error(err)
})
