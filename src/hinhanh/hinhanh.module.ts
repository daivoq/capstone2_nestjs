import { Module } from '@nestjs/common';
import { HinhanhService } from './hinhanh.service';
import { HinhanhController } from './hinhanh.controller';

@Module({
  controllers: [HinhanhController],
  providers: [HinhanhService]
})
export class HinhanhModule {}
