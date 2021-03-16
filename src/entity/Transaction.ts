/**
 *
 * User Entity
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsIn, IsInt, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ConstantUtil } from '../util/constants';

@Entity('transactions')
@Index('uniq_type', ['transaction_id'], { unique: true })
export class Transaction {

    @PrimaryGeneratedColumn()
    @Generated()
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
    @MinLength(1)
    amount: number;

    @Column()
    @IsString()
    @MinLength(26)
    @MaxLength(35)
    source_address: string;

    @Column()
    @IsString()
    @MinLength(26)
    @MaxLength(35)
    destination_address: string;

    @Column()
    @IsString()
    @MaxLength(8)
    transaction_id: string;

    @Column()
    @IsString()
    @MinLength(2)
    @MaxLength(512)
    type: string;

    @Column()
    @IsString()
    @MinLength(2)
    @MaxLength(512)
    @IsIn([
        ConstantUtil.PENDING,
        ConstantUtil.COMPLETED,
    ])
    state: string;

    @CreateDateColumn()
    @IsDate()
    processed_at: Date;

    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;

}
