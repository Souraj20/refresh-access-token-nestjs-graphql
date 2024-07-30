import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class RegisterUserDto {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;

  @Field()
  user: User;
}