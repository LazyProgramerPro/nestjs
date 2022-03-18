import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      //save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
        // ngoai data truyen len thi co the chi dinh 1 so truong cha ve de obj de chiu hon
        // select:{
        //   id: true,
        //   email:true,
        //   createdAt:true,
        // }
      });

      //delete property

      delete user.hash;

      //return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    // return this.signToken(user.id, user.email);
  }
}
