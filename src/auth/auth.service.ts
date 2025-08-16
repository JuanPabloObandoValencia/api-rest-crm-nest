import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async validateUser(user: LoginDto) {

        const foundUser = await this.prisma.user.findUnique({ where: { email: user.email } });

        if (!foundUser) {

            return null;

        }

        if (foundUser.password && (await bcrypt.compare(user.password, foundUser.password))) {

            const payload: any = { email: foundUser.email, sub: foundUser.id };

            return { access_token: this.jwtService.sign(payload) };

        }

    }

}
