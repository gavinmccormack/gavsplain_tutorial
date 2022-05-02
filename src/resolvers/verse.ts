import { VerseContent } from "../entities/VerseContent";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class VerseResolver{
    @Query(() => [VerseContent])
    getAllVerses( // NB: Development only. Would cordon this off
        @Ctx() {em}: MyContext
    ) { // What return type goes here?
        return em.find(VerseContent, { })
    }

    @Query(() => VerseContent, { nullable:true } ) // Return type
    getVerseContent(
        @Arg("id",() => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<VerseContent | null> | null{
        return em.findOne(VerseContent, {id})
    }

    @Mutation(() => VerseContent, { nullable:true })
    async createVerseContent(
        @Arg("title", () => String) title: string,
        @Arg("bodyContent", () => String) bodyContent: string,
        // Content: this is the exposed field. bodyContent for function
        @Ctx() {em}: MyContext
    ): Promise<VerseContent> {

        const verse = em.create(VerseContent, {title, bodyContent})
        await em.persistAndFlush(verse)
        return verse
    }

    @Mutation(() => Boolean, { nullable:true})
    async deleteVerseContent(
        @Arg("id") id: number,
        @Ctx() {em}: MyContext
    ): Promise<boolean> {
        await em.nativeDelete(VerseContent, {id})
        return true
    }
}