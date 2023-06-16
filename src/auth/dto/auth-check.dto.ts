import { IsJWT } from "class-validator";

export class AuthCheckDto {
    @IsJWT()
    Token:string;
}
