import { ApiProperty } from "@nestjs/swagger";

export class Login {
    @ApiProperty({ description: "email", type: String })
    email: string;
    @ApiProperty({ description: "mat_khau", type: String })
    mat_khau: string;
}