import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LuuanhService } from './luuanh.service';
import { AccessToken } from 'src/middleware/jwt/access_token.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Luu anh")
@Controller('luuanh')
export class LuuanhController {
  constructor(private readonly luuanhService: LuuanhService) { }

  @ApiBearerAuth()
  @Post(':hinhId')
  saveImg(@Param('hinhId') hinhId:string, @AccessToken() token: string) {
    return this.luuanhService.saveImg(+hinhId, token)
  }

  @ApiBearerAuth()
  @Get('user-is-saved-img/:hinhId')
  userIsSaved(@Param('hinhId') hinhId: string, @AccessToken() token: string) {
    return this.luuanhService.userIsSaved(+hinhId, token)
  }

  @ApiBearerAuth()
  @Get('list-img-user-saved')
  listImgSavedByUserId(@AccessToken() token: string) {
    return this.luuanhService.listImgSavedByUserId(token)
  }
}
