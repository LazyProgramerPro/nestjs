import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule],
  // khi su dung 2 module o ngon thi phai exp ra ngoai trong file module sau do import
  //  vaof cac module khac
  //  (VD: exp Servie prisma ==> modulePrimsa==>import vao AUthModule==>dung o AUTH Servic)
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
