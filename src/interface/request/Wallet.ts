/**
 *
 * WalletRequest
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */
import { IsDate, IsEmail, IsIn, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class WalletRequest {
  @IsEmail()
  currency: string;

  @MaxLength(1000)
  amount: number;
}