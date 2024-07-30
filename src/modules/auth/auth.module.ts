import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        UsersModule,
        JwtModule.register({
            signOptions: { expiresIn: '1d' },
            secret: '+IyYJYcjbDloXdwdsKc='
        })
    ],
    providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy, RefreshJwtStrategy]
})

export class AuthModule {
}
