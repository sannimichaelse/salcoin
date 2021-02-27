/**
 *
 * Token Request
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */
import { IsDate, IsEmail, IsIn, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class Token {
  @IsEmail()
  email: string;

  @IsInt()
  id: number;

  @IsString()
  status: string;
}