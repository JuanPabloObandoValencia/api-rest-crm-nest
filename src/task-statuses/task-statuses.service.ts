import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskStatusesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.taskStatus.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
