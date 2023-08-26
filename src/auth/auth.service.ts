import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SignUp } from './dto/signup-auth.dto';
import { Login } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
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

    async signUp(signUp: SignUp) {
        let { ho_ten, email, mat_khau, tuoi } = signUp

        try {
            let check = await this.prisma.nguoi_dung.findFirst({
                where: {
                    email
                }
            })
            if (check) {
                return 'email đã tồn tại'
            } else {
                let hashedPassword = await bcrypt.hash(mat_khau, 10);
                let data = { ho_ten, email, mat_khau: hashedPassword, tuoi: +tuoi }

                await this.prisma.nguoi_dung.create({
                    data
                })
                return 'đăng ký thành công'
            }
        } catch {
            return "Lỗi"
        }
    }

    async login(login: Login) {
        let { email, mat_khau } = login;
        try {
            let check = await this.prisma.nguoi_dung.findFirst({
                where: {
                    email,
                },
            });
            if (check) {
                let isMatch = await bcrypt.compare(mat_khau, check.mat_khau);
                let data = check;

                if (isMatch) {
                    let token = jwt.sign({ data }, this.secretKey, { expiresIn: '1h' })

                    return {
                        message: 'Đăng nhập thành công',
                        token,
                    };
                } else {
                    return 'MK không đúng';
                }
            } else {
                return 'email không đúng';
            }
        } catch {
            return 'Lỗi';
        }
    }

    async findAll(token: string) {
        const isTokenValid = this.validateToken(token);
        if (!isTokenValid) {
            return "Không có quyền";
        }
        else {
            let data = await this.prisma.nguoi_dung.findMany()
            return data
        }
    }
}

