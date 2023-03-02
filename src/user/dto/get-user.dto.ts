import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class GetUserDto extends User {
    @IsString()
    @IsNotEmpty()
    readonly username: string

    @IsPhoneNumber('BR')
    @IsNotEmpty()
    readonly cellphone: string


}
