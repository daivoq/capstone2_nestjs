import { ApiProperty } from "@nestjs/swagger";

export class CreateImg {
    @ApiProperty({ description: "mo_ta", type: String })
    mo_ta: string
}