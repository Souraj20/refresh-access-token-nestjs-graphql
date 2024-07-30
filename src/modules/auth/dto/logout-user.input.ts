import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LogoutUserInput {

    @Field()
    username: string;
}