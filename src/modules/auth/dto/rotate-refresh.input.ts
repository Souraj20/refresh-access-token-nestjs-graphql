import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RotateRefreshInput {

    @Field()
    username: string;

    @Field()
    refresh_token: string;
}