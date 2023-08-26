import { ApiProperty } from "@nestjs/swagger";

export class SignUp {
    @ApiProperty({ description: "ho_ten", type: String })
    ho_ten: string;
    @ApiProperty({ description: "email", type: String })
    email: string;
    @ApiProperty({ description: "mat_khau", type: String })
    mat_khau: string;
    @ApiProperty({ description: "mat_khau", type: String })
    tuoi: string;
}
