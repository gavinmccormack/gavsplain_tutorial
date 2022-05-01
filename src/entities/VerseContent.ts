import { Entity, PrimaryKey } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class VerseContent {
    @Field(() => Int)
    @PrimaryKey()
    id!: number

    @Field(() => String)
    bodyContent: String

    @Field(() => String)
    title: String
}

// Relevant docs
// https://typegraphql.com/docs/types-and-fields.html

