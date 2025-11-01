import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const {
      email,
      password,
      firstName,
      secondName,
      firstLastName,
      secondLastName,
    } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new BadRequestException('El correo ya está en uso');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name: firstName,
        second_name: secondName,
        first_last_name: firstLastName,
        second_last_name: secondLastName,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        first_last_name: true,
        role_id: true,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        role: { select: { name: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        first_last_name: true,
        email: true,
        role: { select: { name: true } },
      },
    });
  }

  async findOne(id: number) {
    if (!id) throw new Error('ID de usuario no proporcionado');

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        first_name: true,
        first_last_name: true,
        role: { select: { name: true } },
      },
    });

    return user;
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...rest } = updateUserDto;
    const data: any = { ...rest };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        first_name: true,
        first_last_name: true,
        role: { select: { name: true } },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });
  }
}
