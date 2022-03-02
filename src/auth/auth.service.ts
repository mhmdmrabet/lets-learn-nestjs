import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

  async signin(dto: AuthDto) {
    // * Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //   If user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // * Compare pwd
    const pwdMatches = await argon.verify(user.hash, dto.password);
    //   If pwd incorrect throw exception
    if (!pwdMatches) throw new ForbiddenException('Credentials incorrect');

    delete user.hash;

    // * Send back the user
    return user;
  }
}
