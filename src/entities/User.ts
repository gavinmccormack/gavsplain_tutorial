import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
    @Field(() => Int)
    @PrimaryKey()
    id!: number

    @Field(() => String)
    @Property({type: 'date'})
    createdOn? = new Date()

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedOn? = new Date()

    @Field() // This Field decorator makes the field available for graphql
    @Property({ type: "text", unique: true})
    username!: string

    @Property({ type: "text" })
    password!: string
}