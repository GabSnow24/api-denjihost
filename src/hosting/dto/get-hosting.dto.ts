import { ApiProperty } from "@nestjs/swagger"
import { IsCurrency, IsDecimal, IsString } from "class-validator"
import { Hosting } from "../entities/hosting.entity";

export class GetHostingDto extends Hosting {

    @ApiProperty({
        description: 'The id of the item (UUID)',
        default: "123e4567-e89b-12d3-a456-426614174000",
        type: String
    })
    id: string;

    @ApiProperty({
        description: 'The name of the item',
        default: "Pão de batata",
        type: String
    })
    name: string;

    @ApiProperty({
        description: 'The price of the item',
        default: 10.99,
        type: Number
    })
    price: number;

    @ApiProperty({
        description: 'The weight of the item',
        default: 10.9,
        type: Number
    })
    weight: number;
}