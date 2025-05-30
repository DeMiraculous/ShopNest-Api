import { IsEmail, IsNotEmpty, IsString, matches, Matches } from "class-validator";
import { Match } from "../decorators/match.decorator,";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'must be a valid Email' })
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class ResetPasswordDto {

    @IsString()
    @IsNotEmpty()
    password: string;

    @Match('password', { message: 'Passwords do not match' })
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}
export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'must be a valid Email' })
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}