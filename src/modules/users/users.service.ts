import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { RegisterUserInput } from "../auth/dto/register-user.input";
import { CreateUserInput } from "./dto/create-user.input";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {
    }

    async create(createUserInput: CreateUserInput) {
        const user = this.userRepo.create(createUserInput);
        const savedUser = await this.userRepo.save(user);

        return savedUser;
    }

    async findAll() {
        return await this.userRepo.find();
    }

    async findOne(username: string) {
        return await this.userRepo.findOne({
            where: {
                username
            }
        });
    }

    async update(updateUserInput: UpdateUserInput) {
        const existUser = await this.findOne(updateUserInput.username)
        const updatedUser = this.userRepo.merge(existUser, updateUserInput);

        return await this.userRepo.save(updatedUser);
    }

    remove(id: number) {
        return `This action removes a #${ id } user`;
    }
}
