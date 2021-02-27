/**
 *
 * User Entity
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { Column, OneToMany, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';
import { Wallet } from './Wallet';

@Entity('currencies')
@Index('uniq_type', ['type'], { unique: true })
export class Currencies {

    @PrimaryGeneratedColumn()
    @Generated()
    id: number;

    @Column()
    @IsString()
    @MinLength(2)
    @MaxLength(512)
    type: string;

    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;

}
