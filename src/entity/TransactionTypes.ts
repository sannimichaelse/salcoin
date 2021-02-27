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
import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';

@Entity('transaction_types')
@Index('uniq_name', ['name'], { unique: true })
export class TransactionTypes {

    @PrimaryColumn('bigint')
    @Generated()
    id: number;

    @Column()
    @IsString()
    @MinLength(2)
    @MaxLength(512)
    name: string;

    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;

}
