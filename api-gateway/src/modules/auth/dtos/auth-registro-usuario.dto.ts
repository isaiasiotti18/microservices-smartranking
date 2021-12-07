import { IsEmail, IsMobilePhone, IsString, Matches } from "class-validator"

export class AuthRegistroUsuarioDto {
  @IsString()
  nome: string
  
  @IsEmail()
  email: string
  
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {message: 'Senha inválida.'})
  senha: string
  
  @IsMobilePhone('pt-BR')
  telefoneCelular: string
}