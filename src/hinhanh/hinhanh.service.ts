import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { SearchImg } from './dto/search.dto';
import { async } from 'rxjs';

@Injectable()
export class HinhanhService {
    constructor(private readonly configService: ConfigService) { }
    prisma = new PrismaClient()
    private readonly secretKey = this.configService.get('KEY');

    validateToken(token: string): boolean {
        try {
            jwt.verify(token, this.secretKey);
            return true;
        } catch (error) {
            return false;
        }
    }


    async findAll(token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            try {
                let data = await this.prisma.hinh_anh.findMany()
                return data
            } catch {
                return "Lỗi"
            }
        } else {
            return "không có quyền"
        }
    }

    async findOne(hinhAnhId: number, token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            try {
                let check = await this.prisma.hinh_anh.findFirst({
                    where: {
                        hinh_id: hinhAnhId
                    }
                })
                if (check) {
                    let data = await this.prisma.hinh_anh.findFirst({
                        where: {
                            hinh_id: hinhAnhId
                        },
                        include:{
                            nguoi_dung:true
                        }
                    })
                    return data
                } else {
                    return "hình không tồn tại"
                }
            } catch {
                return "lỗi"
            }
        } else {
            return "không có quyền"
        }
    }

    async findMany(search: string, token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            try {
                let data = await this.prisma.hinh_anh.findMany({
                    where: {
                        ten_hinh: {
                            contains: search
                        }
                    }
                });
                return data;
            } catch {
                return { error: "lỗi" };
            }
        } else {
            return { error: "không có quyền" };
        }
    }

    async listImgCreated(token: string) {
        const isTokenValid = this.validateToken(token)
        if (isTokenValid) {
            try {
                let dataToken = jwt.decode(token) as {
                    data: {
                        nguoi_dung_id: number
                    }
                }
                let data = await this.prisma.hinh_anh.findMany(
                    {
                        where: {
                            nguoi_dung_id: dataToken.data.nguoi_dung_id
                        }
                    }
                )
                return data
            } catch  {
                return "lỗi"
            }
        } else {
            return "Không có quyền"
        }
    }

    async removeById(hinhAnhId: number, token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            try {
                // Xóa liên kết từ bảng luu_anh
                await this.prisma.luu_anh.deleteMany({
                    where: {
                        hinh_id: hinhAnhId,
                    },
                });

                // Xóa liên kết từ bảng binh_luan
                await this.prisma.binh_luan.deleteMany({
                    where: {
                        hinh_id: hinhAnhId,
                    },
                });

                // Xóa hình ảnh từ bảng hinh_anh
                await this.prisma.hinh_anh.delete({
                    where: {
                        hinh_id: hinhAnhId,
                    },
                })
                return `xóa hình ${hinhAnhId} thành công`
            } catch {
                return "Lỗi"
            }
        } else {
            return "Không có quyền"
        }
    }

}