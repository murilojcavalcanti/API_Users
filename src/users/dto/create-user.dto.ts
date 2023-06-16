import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/Enums/role.enum";

export class CreateUserDto {
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    /*@IsStrongPassword({
        minLength:8,
        minNumbers:1,
        minUppercase:2
    })*/
    password: string;
    @IsOptional()
    @IsEnum(Role)
    role:number

    birthAt:Date

}
