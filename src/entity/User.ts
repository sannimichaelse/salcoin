/**
 *
 * User Entity
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { Column, OneToMany, CreateDateColumn, Entity, Generated, Index,PrimaryGeneratedColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsEmail, IsIn, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { ConstantUtil } from '../util/constants';
import { Wallet } from './Wallet';
import { Currencies } from './Currencies';

@Entity('users')
@Index('uniq_user_email', ['email'], { unique: true })
export class User {

    @PrimaryGeneratedColumn()
    @Generated()
    @IsOptional()
    id: number;

    @Column()
    @IsString()
    @MinLength(2)
    @MaxLength(512)
    name: string;

    @Column()
    @IsEmail()
    @MaxLength(512)
    email: string;

    @Column()
    @IsString()
    @MaxLength(512)
    password: string;

    @Column()
    @IsString()
    @MaxLength(512)
    description: string;

    @Column('integer')
    @IsInt()
    @IsIn([
        ConstantUtil.ACTIVE,
        ConstantUtil.INACTIVE,
    ])
    status: number;

    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;

}
