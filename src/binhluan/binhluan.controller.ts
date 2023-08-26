import { Controller, Get, Param, Post, Body, Req } from '@nestjs/common';
import { BinhluanService } from './binhluan.service';
import { CreateBinhluan } from './dto/create-binhluan.dto';
import { AccessToken } from 'src/middleware/jwt/access_token.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Binh-luan')
@Controller('binhluan')
export class BinhluanController {
  constructor(private readonly binhluanService: BinhluanService) { }

  @ApiBearerAuth()
  @Get('comment-by-id-img/:hinhId')
  cmtByIdImg(@Param('hinhId') hinhId: string, @AccessToken() token: string) {
    return this.binhluanService.cmtByIdImg(+hinhId, token)
  }

  @ApiBearerAuth()
  @Post('add-comment/:hinhId')
  addCmtByIdImg(@Body() createBinhluan: CreateBinhluan, @AccessToken() token: string, @Param('hinhId') hinhId: string) {
    return this.binhluanService.addCmtByIdImg(createBinhluan, token, +hinhId)
  }
}
