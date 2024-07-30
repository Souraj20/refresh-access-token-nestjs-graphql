import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {
        const user = this.authService.validate_user(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}