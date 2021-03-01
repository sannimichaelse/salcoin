/**
 *
 * User Request
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */
import { IsDate, IsEmail, IsIn, IsInt, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class TransactionRequest {
  @IsString()
  currency: string;

  @IsNumber()
  @MaxLength(1000000000)
  amount: number;

  @IsString()
  @MinLength(26)
  @MaxLength(35)
  source_address: string;

  @IsString()
  @MinLength(26)
  @MaxLength(35)
  destination_address: string;

  @MaxLength(10)
  password: string;

  @IsString()
  @MaxLength(512)
  type: string;

  @IsString()
  @MaxLength(512)
  transaction_id: string;
}