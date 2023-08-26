import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LuuanhService {
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

    async saveImg(hinhId:number, token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            let dayNow = new Date()
            let dataToken = jwt.decode(token) as { data: { nguoi_dung_id: number } };
            let nguoi_dung_id = dataToken.data.nguoi_dung_id
            let data = { ngay_luu: dayNow, nguoi_dung_id, hinh_id:hinhId }

            let checkIsSave = await this.prisma.luu_anh.findFirst({
                where: {
                    hinh_id:hinhId,
                    nguoi_dung_id
                }
            })

            try {
                if (checkIsSave) {
                    return "ảnh này đã được lưu rồi"
                }
                else{
                    await this.prisma.luu_anh.create({
                        data
                    })
                    return 'lưu ảnh thành công'
                }
            } catch {
                return "Lỗi"
            }
        } else {
            return "không có quyền"
        }

    }


    async userIsSaved(hinhId: number, token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            let dataToken = jwt.decode(token) as { data: { nguoi_dung_id: number } }
            try {
                let check = await this.prisma.luu_anh.findFirst({
                    where: {
                        hinh_id: hinhId,
                        nguoi_dung_id: dataToken.data.nguoi_dung_id
                    }
                })
                if (check) {
                    return `saved`
                } else {
                    return `nosave`
                }
            } catch {
                return "Lỗi"
            }
        } else {
            return "không có quyền"
        }
    }

    async listImgSavedByUserId(token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            let dataToken = jwt.decode(token) as { data: { nguoi_dung_id: number } }
            try {
                let data = await this.prisma.luu_anh.findMany({
                    where: {
                        nguoi_dung_id: dataToken.data.nguoi_dung_id
                    },
                    include:{
                        hinh_anh:true
                    }
                })
                return data
            } catch {
                return "Lỗi"
            }
        } else {
            return "không có quyền"
        }
    }
}
