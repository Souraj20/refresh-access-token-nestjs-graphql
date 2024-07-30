import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LoginUserInput } from "./dto/login-user.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserInput } from './dto/register-user.input';
import { LogoutUserResponse } from "./dto/logout-user.response";
import { LogoutUserInput } from "./dto/logout-user.input";
import { RotateRefreshResponse } from "./dto/rotate-refresh.response";
import { RotateRefreshInput } from "./dto/rotate-refresh.input";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {
    }

    @Mutation(() => LoginDto)
    // @UseGuards(GqlAuthGuard)
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return await this.authService.login(loginUserInput)
    }

    @Mutation(() => RegisterUserDto)
    async register_user(@Args('registerUserinput') registerUserinput: RegisterUserInput) {
        return await this.authService.register(registerUserinput);
    }

    @Mutation(() => LogoutUserResponse)
    async logout_user(@Args('logoutUserInput') logoutUserInput: LogoutUserInput) {
        return await this.authService.logout(logoutUserInput.username);
    }

    @Mutation(() => RotateRefreshResponse)
    async rotate_refresh(@Args('rotateRefreshInput') rotateRefreshInput: RotateRefreshInput) {
        return this.authService.refresh(rotateRefreshInput.username, rotateRefreshInput.refresh_token);
    }
}
