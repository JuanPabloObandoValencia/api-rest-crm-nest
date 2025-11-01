import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsString()
    firstName: string;

    @IsString()
    secondName: string;

    @IsString()
    firstLastName: string;

    @IsString()
    secondLastName: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    @MinLength(6)
    password: string;

}
