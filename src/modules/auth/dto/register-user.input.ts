import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  password2: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field({ nullable: true })
  refresh_token?: string;
}