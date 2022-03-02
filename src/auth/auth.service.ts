import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return { message: 'Selem, Imran ! You have sign in' };
  }

  signup(dto: AuthDto) {
    return { message: 'Selem, Imran ! You have signed up', data: dto };
  }
}
