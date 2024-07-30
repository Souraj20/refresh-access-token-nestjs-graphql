import { BadRequestException, ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserInput } from './dto/register-user.input';
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginDto } from "./dto/login.dto";
import { LogoutUserResponse } from "./dto/logout-user.response";
import { RotateRefreshResponse } from "./dto/rotate-refresh.response";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {

    }

    async validate_user(username: string, password: string) {
        const user = await this.usersService.findOne(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async register(registerUserinput: RegisterUserInput): Promise<RegisterUserDto> {

        const user = await this.usersService.findOne(registerUserinput.username);

        if (user) {
            throw new ConflictException('کاربر با این نام کاربری وجود دارد.');
        }

        if (registerUserinput.password !== registerUserinput.password2) {
            throw new BadRequestException('عدم تطابق رمز عبور');
        }

        const hashedPassword = await bcrypt.hash(registerUserinput.password, 12);

        const payload = {
            username: registerUserinput.username,
            sub: {
                first_name: registerUserinput.first_name,
                last_name: registerUserinput.last_name,
            },
        };

        const { password2, ...others } = registerUserinput;

        const {
            password,
            refresh_token,
            ...result
        } = await this.usersService.create({
            ...others,
            password: hashedPassword,
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        });

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refresh_token,
            user: {
                ...result,
                password
            }
        }
    }

    async login(loginUserinput: LoginUserInput): Promise<LoginDto> {
        const user = await this.usersService.findOne(loginUserinput.username);

        const payload = {
            username: user.username,
            sub: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        };

        const updatedUser = await this.usersService.update({
            id: user.id,
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' })
        });

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: updatedUser.refresh_token,
        };
    }

    async refresh(username: string, refresh: string): Promise<RotateRefreshResponse> {
        const user = await this.usersService.findOne(username);

        if (!user) {
            throw new BadRequestException('چنین کاربری وجود ندارد.');
        }

        if (refresh !== user.refresh_token) {
            throw new ConflictException('کاربر نامعتبر است.');
        }

        const payload = {
            username: user.username,
            sub: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        };

        const updated_user = await this.usersService.update({
            id: user.id,
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' })
        });

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: updated_user.refresh_token
        };
    }

    async logout(username: string): Promise<LogoutUserResponse> {
        const user = await this.usersService.findOne(username);
        const updatedUser = await this.usersService.update({ id: user.id, refresh_token: null });

        return { message: 'با موفقیت از حساب خود خارج شدید.' };
    }
}
