import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => Int)
    id: number;

    @Column({ unique: true })
    @Field(() => String)
    username: string;

    @Column({ nullable: true })
    @Field(() => String)
    email?: string;

    @Column()
    @Field(() => String)
    password: string;

    @Column()
    @Field(() => String)
    first_name: string;

    @Column()
    @Field(() => String)
    last_name: string;

    @Column({ nullable: true })
    @Field(() => String)
    phoneNumber?: string;

    @Column({ nullable: true, type: 'longtext' })
    @Field((() => String))
    refresh_token?: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}
