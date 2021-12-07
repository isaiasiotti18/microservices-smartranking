import { IsEmail, IsMobilePhone, IsString, Matches } from "class-validator"

export class AuthLoginUsuarioDto {
  @IsEmail()
  email: string
  
  senha: string
}