import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HinhanhModule } from './hinhanh/hinhanh.module';
import { AuthModule } from './auth/auth.module';
import { BinhluanModule } from './binhluan/binhluan.module';
import { LuuanhModule } from './luuanh/luuanh.module';
import { NguoidungModule } from './nguoidung/nguoidung.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express/multer';
import { MulterMiddleware } from './middleware/multer/multer.middleware';
import { UploadController } from './middleware/multer/upload.controller';

@Module({
  imports: [
    HinhanhModule,
    AuthModule,
    BinhluanModule,
    LuuanhModule,
    NguoidungModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.registerAsync({
      useClass: MulterMiddleware,
    }),
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, MulterMiddleware],
})
export class AppModule { }
