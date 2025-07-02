import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthRequest {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}