import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import * as compress_images from 'compress-images';
import * as fs from 'fs-extra';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from '../jwt/access_token.decorator';
import { CreateImg } from 'public/dto/create-img.dto';

@ApiTags('Upload')
@Controller('files')
export class UploadController {
    constructor(private readonly configService: ConfigService) { }

    prisma = new PrismaClient()
    private readonly secretKey = this.configService.get('KEY');

    // hàm kiểm tra token
    validateToken(token: string): boolean {
        try {
            jwt.verify(token, this.secretKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    // ... //

    @ApiBearerAuth()
    @Post('upload-avatar')
    @ApiConsumes('multipart/form-data') // Đây là phần cần thêm vào để hiển thị nơi chọn file
    @UseInterceptors(FileInterceptor('file'))
    // tạo từ khóa là "file"

    // Lấy img từ .public/img -> compress -> chuyển img đã compress vào .public/img_compress ->lưu vào database
    async uploadAvatar(@UploadedFile() file: Express.Multer.File, @AccessToken() token: string) {

        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            let dataToken = jwt.decode(token) as { data: { nguoi_dung_id: number, ho_ten:string, tuoi:number, email:string, mat_khau:string } }
            let nguoi_dung_id = dataToken.data.nguoi_dung_id
            let ho_ten= dataToken.data.ho_ten
            let tuoi = dataToken.data.tuoi
            let email = dataToken.data.email
            let mat_khau = dataToken.data.mat_khau

            const imagePath = `${process.cwd()}/public/img/${file.filename}`;
            const compressedImagePath = `./public/img_compress/`;

            // dùng compress-images để giảm dung lượng hình ảnh
            // yarn add compres-images pngquant-bin gifsicle
            await compress_images(
                imagePath,
                compressedImagePath,
                { compress_force: false, statistic: true, autoupdate: true },
                false,
                { jpg: { engine: 'mozjpeg', command: ['-quality', '25'] } },
                { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
                { svg: { engine: 'svgo', command: '--multipass' } },
                { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
                async function (error, completed, statistic) {
                    console.log('-------------');
                    console.log(error);
                    console.log(completed);
                    console.log(statistic);
                    console.log('-------------');

                    // xóa file gốc trong thư mục img sau khi đã giảm dung lượng hình ảnh
                    // yarn add fs-extra 
                    try {
                        await fs.unlink(imagePath);
                        console.log('Đã xóa ảnh gốc thành công.');
                        return 'Đã xóa ảnh gốc thành công.';
                    } catch (error) {
                        console.error(error);
                        return 'Lỗi khi xóa ảnh gốc.';
                    }
                }
            );

            // lưu tên img đã compress vào database 
            await this.prisma.nguoi_dung.update({
                where: { nguoi_dung_id },
                data: { anh_dai_dien: file.filename , ho_ten, tuoi, email, mat_khau }
            })

            return 'Compressed img vào source BE và Uploaded img vào DTB thành công';
        } else {
            return "không có quyền"
        }


    }

    // ... //
    @ApiBearerAuth()
    @Post('upload-image')
    @ApiConsumes('multipart/form-data') // Đây là phần cần thêm vào để hiển thị nơi chọn file
    @UseInterceptors(FileInterceptor('file'))    
    async uploadImg(@UploadedFile() file: Express.Multer.File, @AccessToken() token: string, @Body() body: CreateImg) {

        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            let dataToken = jwt.decode(token) as { data: { nguoi_dung_id: number } }
            let nguoi_dung_id = dataToken.data.nguoi_dung_id

            const imagePath = `${process.cwd()}/public/img/${file.filename}`;
            const compressedImagePath = `./public/img_compress/`

            // dùng compress-images để giảm dung lượng hình ảnh
            // yarn add compres-images pngquant-bin gifsicle
            await compress_images(
                imagePath,
                compressedImagePath,
                { compress_force: false, statistic: true, autoupdate: true },
                false,
                { jpg: { engine: 'mozjpeg', command: ['-quality', '25'] } },
                { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
                { svg: { engine: 'svgo', command: '--multipass' } },
                { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
                async function (error, completed, statistic) {
                    console.log('-------------');
                    console.log(error);
                    console.log(completed);
                    console.log(statistic);
                    console.log('-------------');

                    // xóa file gốc trong thư mục img sau khi đã giảm dung lượng hình ảnh
                    // yarn add fs-extra 
                    try {
                        await fs.unlink(imagePath);
                        console.log('Đã xóa ảnh gốc thành công.');
                        return 'Đã xóa ảnh gốc thành công.';
                    } catch (error) {
                        console.error(error);
                        return 'Lỗi khi xóa ảnh gốc.';
                    }
                }
            );

            let { mo_ta } = body
            let ten_hinh = file.filename
            let duong_dan = `/public/img/${file.filename}`
            let data = { ten_hinh, duong_dan, mo_ta, nguoi_dung_id }

            await this.prisma.hinh_anh.create({
                data
            })
            return 'Compressed img vào source BE và Uploaded img vào DTB thành công';
        } else {
            return "không có quyền"
        }
    }
}