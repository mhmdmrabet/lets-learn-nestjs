import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { message: 'Selem, Imran ! You have sign in' };
  }

  signup() {
    return { message: 'Selem, Imran ! You have signed up' };
  }
}
