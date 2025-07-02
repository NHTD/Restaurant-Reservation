/* eslint-disable @typescript-eslint/no-unsafe-call */
import {IsEmail, IsNotEmpty, IsString, IsInt, Min} from 'class-validator';

export class UserUpdateRequest {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

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