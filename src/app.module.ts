import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./modules/users/entities/user.entity";

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/schema.gql'
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            username: 'root',
            password: '1091110911c++',
            port: 3306,
            database: 'meta-social',
            entities: [User],
            synchronize: true
        }),
        UsersModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
