import { Controller, Get, Delete, Param, Body, Post, Query } from '@nestjs/common';
import { HinhanhService } from './hinhanh.service';
import { AccessToken } from 'src/middleware/jwt/access_token.decorator';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { SearchImg } from './dto/search.dto';

@ApiTags("Hinh anh")
@Controller('hinhanh')
export class HinhanhController {
  constructor(private readonly hinhanhService: HinhanhService) { }

  @ApiBearerAuth()
  @Get()
  findAll(@AccessToken() token: string) {
    return this.hinhanhService.findAll(token)
  }

  @ApiBearerAuth()
  @Get('/:hinhAnhId')
  findOne(@Param('hinhAnhId') hinhAnhId: string, @AccessToken() token: string) {
    return this.hinhanhService.findOne(+hinhAnhId, token)
  }

  @ApiBearerAuth()
  @Post('search') 
  findMany(@Body() searchImg: SearchImg, @AccessToken() token: string) {
    return this.hinhanhService.findMany(searchImg.search, token);
  }

  @ApiBearerAuth()
  @Post('imgs-created')
  listImgCreated(@AccessToken() token: string) {
    return this.hinhanhService.listImgCreated(token)
  }

  @ApiBearerAuth()
  @Delete(':hinhAnhId')
  removeById(@Param('hinhAnhId') hinhAnhId: string, @AccessToken() token: string) {
    return this.hinhanhService.removeById(+hinhAnhId, token);
  }
}
