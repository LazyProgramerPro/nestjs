import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  // khi su dung 2 module o ngon thi phai exp ra ngoai trong file module sau do import
  //  vaof cac module khac
  //  (VD: exp Servie prisma ==> modulePrimsa==>import vao AUthModule==>dung o AUTH Servic)
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
