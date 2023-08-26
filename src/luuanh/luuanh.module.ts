import { Module } from '@nestjs/common';
import { LuuanhService } from './luuanh.service';
import { LuuanhController } from './luuanh.controller';

@Module({
  controllers: [LuuanhController],
  providers: [LuuanhService]
})
export class LuuanhModule {}
