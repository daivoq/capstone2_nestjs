import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdataNguoidung } from './dto/update-nguoidung.dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class NguoidungService {
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

    async findOne(token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            let dataToken = jwt.decode(token) as { data: { nguoi_dung_id: number } }; // Giải mã token và chỉ định kiểu của payload
            let checkUser = await this.prisma.nguoi_dung.findFirst({
                where: {
                    nguoi_dung_id: dataToken.data.nguoi_dung_id, // Lấy email từ payload
                },
            });
            return checkUser;
        } else {
            return "không có quyền";
        }
    }

    async update(updateNguoiDung: UpdataNguoidung, token: string) {
        const isTokenValid = this.validateToken(token);
        if (isTokenValid) {
            let dataToken = jwt.decode(token) as { data: { nguoi_dung_id: number } }
            let {ho_ten, email, mat_khau, tuoi}= updateNguoiDung
            let newPassWord = await bcrypt.hash(mat_khau, 10);

            let data= {ho_ten, email, mat_khau:newPassWord, tuoi: +tuoi}
            try {
                await this.prisma.nguoi_dung.update({
                    where: {
                        nguoi_dung_id: dataToken.data.nguoi_dung_id
                    },
                    data
                })
                return 'update thành công'
            } catch {
                return 'Lỗi'
            }
        }
        else {
            return "không có quyền"
        }
    }
}
