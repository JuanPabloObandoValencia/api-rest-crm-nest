import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  // async create(createUserDto: CreateUserDto) {

  //   const saltOrRounds = 10;
  //   const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

  //   const user = await this.prisma.user.create({

  //     data: {
  //       email: createUserDto.email,
  //       name: createUserDto.name,
  //       password: hashedPassword,
  //     },

  //   });

  //   return user;

  // }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }


  async findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
