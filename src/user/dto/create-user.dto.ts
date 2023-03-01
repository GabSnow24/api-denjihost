import { IsBoolean, IsEmail, IsFullWidth, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string

  @IsPhoneNumber('BR')
  @IsNotEmpty()
  readonly cellphone: string

  @IsBoolean()
  @IsNotEmpty()
  readonly admin: boolean
}
