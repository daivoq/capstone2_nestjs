import { ApiProperty } from "@nestjs/swagger";

export class UpdataNguoidung {
    @ApiProperty({ description: "ho_ten", type: String })
    ho_ten: string;
    @ApiProperty({ description: "email", type: String })
    email: string;
    @ApiProperty({ description: "mat_khau", type: String })
    mat_khau: string;
    @ApiProperty({ description: "tuoi", type: String })
    tuoi: string;
}