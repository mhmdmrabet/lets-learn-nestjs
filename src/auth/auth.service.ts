import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  async signup(dto: AuthDto) {
    // * generate the pwd hash
    const hash = await argon.hash(dto.password);
    // * save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // * Delete pwd from user object
      delete user.hash;

      // * return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }

  constructor(private prisma: PrismaService) {}
  signin() {
    return { message: 'Selem, Imran ! You have sign in' };
  }
}
