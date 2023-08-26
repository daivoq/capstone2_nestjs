import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUp } from './dto/signup-auth.dto';
import { Login } from './dto/login-auth.dto';
import { AccessToken } from 'src/middleware/jwt/access_token.decorator';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  signUp(@Body() body: SignUp) {
    return this.authService.signUp(body);
  }

  @Post('login')
  login(@Body() login: Login) {
    return this.authService.login(login);
  }

  @ApiBearerAuth() // Thêm decorator @ApiBearerAuth() ở đây để Swagger hiển thị trường nhập token
  @Get('get-all-user')
  findAll(@AccessToken() token: string) {
    return this.authService.findAll(token);
  }
}