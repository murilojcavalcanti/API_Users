import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDto {
    @IsStrongPassword({
        minLength:8,
        minNumbers:1,
        minUppercase:1
    })
    password:string;
    @IsJWT()
    token:string;
}
