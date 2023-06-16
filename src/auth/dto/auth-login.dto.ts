import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthLoginDto {
    @IsEmail()
    email:string;
    
    @IsStrongPassword({
        minLength:8,
        minNumbers:1,
        minUppercase:1
    })
    password:string
}
