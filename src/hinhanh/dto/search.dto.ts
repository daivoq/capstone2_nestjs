import { ApiProperty } from "@nestjs/swagger";

export class SearchImg {
    @ApiProperty({ description: "search", type: String })
    search: string;
}