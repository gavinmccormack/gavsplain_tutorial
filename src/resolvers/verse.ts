import { VerseContent } from "../entities/VerseContent";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

@Resolver()
export class VerseResolver{
    @Query(() => VerseContent, { nullable:true } ) // Return type
    getVerseContent(
        @Arg("id",() => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<VerseContent | null> | null{
        return em.findOne(VerseContent, {id})
    }

}