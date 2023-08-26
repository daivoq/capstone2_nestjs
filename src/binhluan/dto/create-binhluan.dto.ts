import { ApiProperty } from "@nestjs/swagger";

export class CreateBinhluan {
    @ApiProperty({ description: "noi_dung", type: String })
    noi_dung: string;
}