import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBinhluan } from './dto/create-binhluan.dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class BinhluanService {
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

    async cmtByIdImg(hinhId: number, token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            try {
                let data = await this.prisma.binh_luan.findMany({
                    where: {
                        hinh_id: hinhId
                    },
                    include: {
                        nguoi_dung: true
                    }
                })
                return data
            } catch {
                return 'Lỗi'
            }
        } else {
            return 'Không có quyền'
        }

    }

    async addCmtByIdImg(createBinhluan: CreateBinhluan, token: string, hinhId: number) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            let dataToken = jwt.decode(token) as { data: { nguoi_dung_id: number } }
            try {
                let dateNow = new Date()
                let { noi_dung } = createBinhluan

                let data = { hinh_id: hinhId, ngay_binh_luan: dateNow, noi_dung, nguoi_dung_id: dataToken.data.nguoi_dung_id }

                await this.prisma.binh_luan.create({
                    data
                })
                return 'thêm bình luận thành công'
            } catch {
                return 'Lỗi'
            }
        } else {
            return 'Không có quyền'
        }

    }
}
