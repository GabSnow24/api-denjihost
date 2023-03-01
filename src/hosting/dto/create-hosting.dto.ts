import { Hosting } from "../entities/hosting.entity";
import { IsCurrency, IsDecimal, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHostingDto extends Hosting {

    @IsString()
    @ApiProperty({
        description: 'The name of the hosting',
        default: "Node Server",
        type: String
    })
    name: string;


    @IsString()
    @ApiProperty({
        description: 'The language of the program',
        default: "Node",
        type: String
    })
    language: string;

    @IsCurrency()
    @ApiProperty({
        description: 'The price of the hosting',
        default: 10.99,
        type: Number
    })
    price: number;
}
