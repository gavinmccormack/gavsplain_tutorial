import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => [Post])         // Bit of duplication in TS GraphQL
    posts(       // Expects a promise
        @Ctx() {em}: MyContext
    ){
        return em.find(Post, {})
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id', () => Int) id: number, // First arg 'id' defines the public name
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { id })
    }

    @Mutation(() => Post, { nullable: true })
    async createPost(
        @Arg('title') title: string, // First arg 'id' defines the public name
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, {title})
        await em.persistAndFlush(post)
        return post
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg('title') title: string, // First arg 'id' defines the public name
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, { id })
        if (!post) {
            return null
        }
        if (typeof title !== 'undefined') {
            post.title = title;
            await em.persistAndFlush(post)
        }
        await em.persistAndFlush(post)
        return post
    }

    @Mutation(() => Boolean, { nullable: true })
    async deletePost(
        @Arg('id') id: number, // First arg 'id' defines the public name
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        await em.nativeDelete(Post, { id })
        return true
    }
}