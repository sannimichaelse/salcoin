/**
 *
 * User Request
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */
import { IsDate, IsEmail, IsIn, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class WalletRequest {
  @IsEmail()
  email: string;

  @MaxLength(10)
  password: string;

  @IsString()
  @MaxLength(512)
  name: string;

  @IsString()
  @MaxLength(1000)
  description: string;
}