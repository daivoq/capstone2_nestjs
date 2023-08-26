import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { NguoidungService } from './nguoidung.service';
import { UpdataNguoidung } from './dto/update-nguoidung.dto';
import { AccessToken } from 'src/middleware/jwt/access_token.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Nguoi dung")
@Controller('nguoidung')
export class NguoidungController {
  constructor(private readonly nguoidungService: NguoidungService) { }

  @ApiBearerAuth()
  @Get('get-user')
  findOne(@AccessToken() token: string) {
    return this.nguoidungService.findOne(token)
  }

  @ApiBearerAuth()
  @Post('update')
  update(@Body() updateNguoiDung: UpdataNguoidung, @AccessToken() token: string) {
    return this.nguoidungService.update(updateNguoiDung, token)
  }
}
