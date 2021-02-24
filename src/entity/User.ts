/**
 *
 * User Entity
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsEmail, IsIn, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { ConstantUtil } from '../util/constants';

@Entity('user')
@Index('unq_user_email', ['email'], { unique: true })
export class User {

    @PrimaryColumn('bigint')
    @Generated()
    @IsOptional()
    id: number;

    @Column({
        length: 512
    })
    @IsString()
    @MinLength(2)
    @MaxLength(512)
    name: string;

    @Column({
        length: 1000
    })
    @IsEmail()
    @MaxLength(1000)
    email: string;

    @Column({
        length: 10
    })
    @IsString()
    @MaxLength(10)
    password: string;

    @Column({
        length: 1000
    })
    @IsString()
    @MaxLength(1000)
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
