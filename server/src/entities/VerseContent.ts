import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class VerseContent {
    @Field(() => Int)
    @PrimaryKey()
    id!: number

    @Field(() => String)
    @Property()
    bodyContent!: String

    @Field(() => String)
    @Property()
    title!: String
}

// Relevant docs
// https://typegraphql.com/docs/types-and-fields.html

