import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  //khai bao cac servicer trong constructor

  constructor(private authService: AuthService) {}
  // auth/signup with POST
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    //su dung DTO de bat loi object bla
    // if (!dto.email) {
    //   logic;
    // }
    //ko su dung logic kieu nay ma dung Pipe
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
