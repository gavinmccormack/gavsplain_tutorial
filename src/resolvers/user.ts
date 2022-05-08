import { MyContext } from "src/types";
import { User } from "../entities/User"
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import argon from "argon2"

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string
    
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable: true})
    user?: User
}

function createFieldError(field: string, message: string): [FieldError]{
    return [{
        field: field,
        message: message
    }]
}

@Resolver()
export class UserResolver {
    // If this wasn't a demo project, maybe look at Passport, Auth0
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em}: MyContext
    ): Promise<UserResponse> {
        if (options.username.length <= 2) {
            return { 
                errors: createFieldError('username', 'Username is too short')
            }
        }
        if (options.password.length <= 3) {
            return {
                errors: createFieldError('password', 'Password is too short')
            }
        }
        const hashedPassword = await argon.hash(options.password)
        const user = em.create(User, {username: options.username, password: hashedPassword})
        try {
            await em.persistAndFlush(user)
        } catch(err) {
            if (err.code === '23505') {
                return { errors: createFieldError('username', 'Username already exists') }
            }
        }
        return {user}
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em, req}: MyContext
    ) {
        const user = await em.findOne(User, {username: options.username})
        if (!user) {
            return {
                errors: createFieldError('username', 'Username does not exist')
            }
        }
        const valid = await argon.verify(user.password, options.password)
        // Note: The salt is stored alongside the database hashed password.
        // Encoded hash is stored in PHC format.
        if (!valid) {
            return {
                errors: createFieldError('password', 'Incorrect Password')
            }
        }
        req.session.user = user.id
        return {user}
    }    
}

