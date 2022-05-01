import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";

console.log("Hello World; source, and updates");

const main = async () => {
    const orm = await MikroORM.init()
    await orm.getMigrator().up()
    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    })

    await apolloServer.start() // NB: Check
    apolloServer.applyMiddleware({app})

    app.listen(4000, () => {
        console.log("Server started on localhost:4000")
    })

    // const post = orm.em.create(Post, {title:'First Post'});
    // await orm.em.persistAndFlush(post) 
    //await orm.em.nativeInsert(Post, {title: 'my first post 2'}) 
    // const posts = await orm.em.find(Post, {})
    // console.log("Posts: ", posts)
}


main().catch((err)=> {
    console.error(err)
})
