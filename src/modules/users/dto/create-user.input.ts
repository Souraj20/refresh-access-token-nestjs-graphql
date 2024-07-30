import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field({ nullable: true })
  refresh_token?: string;
}
