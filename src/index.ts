import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { VerseResolver } from "./resolvers/verse";

console.log("-[] Add an extra entity, resolvers, CRUD framework");

const main = async () => {
    const orm = await MikroORM.init()
    await orm.getMigrator().up()
    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, VerseResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    })

    await apolloServer.start() // NB: Check
    apolloServer.applyMiddleware({app})

    app.listen(4000, () => {
        console.log("Server started on localhost:4000")
    })
}


main().catch((err)=> {
    console.error(err)
})
