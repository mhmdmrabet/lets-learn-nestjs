import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return { message: 'Selem, Imran ! You have sign in' };
  }

  signup() {
    return { message: 'Selem, Imran ! You have signed up' };
  }
}
