import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";

@ObjectType()
export class LoginDto {

    @Field()
    access_token: string;

    @Field(() => User)
    user: User;
}