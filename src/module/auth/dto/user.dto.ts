import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'must be a valid Email' })
    email : string

    @IsNotEmpty()
    @IsString()
    password : string
}

export class LoginUserDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'must be a valid Email' })
    email : string

    @IsNotEmpty()
    @IsString()
    password : string
}