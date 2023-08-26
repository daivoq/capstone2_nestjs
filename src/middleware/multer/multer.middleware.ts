import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


// Bắt img từ clien quăng zô .public/img
@Injectable()
export class MulterMiddleware implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: process.cwd() + '/public/img',
                filename: (req, file, callback) => {
                    const filename = new Date().getTime() + "_" + file.originalname;
                    callback(null, filename);
                },
            }),
        };
    }
}
