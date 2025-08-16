import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string) {

        const user = await this.usersService.findByEmail(email);

        if (!user) {

            throw new UnauthorizedException('Credenciales incorrectas');

        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {

            throw new UnauthorizedException('Credenciales incorrectas');

        }

        const { password, ...result } = user;

        return result;

    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
        access_token: this.jwtService.sign(payload),
        };
    }
}
