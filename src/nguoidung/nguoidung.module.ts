import { Module } from '@nestjs/common';
import { NguoidungService } from './nguoidung.service';
import { NguoidungController } from './nguoidung.controller';

@Module({
  // imports: [JwtService],
  imports: [],
  controllers: [NguoidungController],
  providers: [NguoidungService]
})
export class NguoidungModule { }
