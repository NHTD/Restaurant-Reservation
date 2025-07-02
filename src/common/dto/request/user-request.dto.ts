/* eslint-disable @typescript-eslint/no-unsafe-call */
import {IsEmail, IsNotEmpty, IsString, MinLength, IsInt, Min} from 'class-validator';

export class UserRequest {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  @IsNotEmpty()
  address: string;
}
