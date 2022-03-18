import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  //khai bao cac servicer trong constructor

  constructor(private authService: AuthService) {}
  // auth/signup with POST
  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
