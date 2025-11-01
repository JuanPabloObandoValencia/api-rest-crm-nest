import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.project.findMany({
      select: {
        id: true,
        name: true,
        tasks: {
          select: {
            id: true,
            title: true,
            status: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
