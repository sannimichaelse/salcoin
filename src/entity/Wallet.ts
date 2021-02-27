/**
 *
 * User Entity
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { Column, ManyToOne, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsEmail, IsIn, IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

@Entity('wallet')
@Index('unq_wallet_address', ['address'], { unique: true })
export class Wallet {

    @PrimaryGeneratedColumn()
    @Generated()
    @IsOptional()
    id: number;

    @Column()
    @IsInt()
    @MinLength(1)
    currency_id: number;

    @Column()
    @IsInt()
    @MinLength(1)
    user_id: number;

    @Column({ type: 'decimal'})
    @IsNumber()
    balance: number;

    @Column()
    @IsString()
    @IsUUID()
    @MinLength(26)
    @MaxLength(35)
    address: string;

    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;

}
