import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // ✅ Crear tarea (asignada a un usuario)
  async create(createTaskDto: CreateTaskDto, userId: number) {
    const {
      title,
      description,
      statusId,
      priorityId,
      projectId,
      assignedTo,
      dueDate,
    } = createTaskDto;

    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status_id: statusId,
        priority_id: priorityId,
        project_id: projectId,
        assigned_to: assignedTo || userId,
        due_date: dueDate ? new Date(dueDate) : null,
      },
    });

    return task;
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        assigned_to: userId,
      },
      include: {
        project: { select: { id: true, name: true } },
        priority: { select: { id: true, name: true, color: true } },
        status: { select: { id: true, name: true, color: true } },
        assignee: {
          select: { id: true, first_name: true, first_last_name: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
        priority: true,
        status: true,
        assignee: true,
      },
    });

    if (!task || task.assigned_to !== userId) {
      throw new ForbiddenException('No tienes acceso a esta tarea');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task || task.assigned_to !== userId) {
      throw new ForbiddenException('No puedes modificar esta tarea');
    }

    const {
      title,
      description,
      statusId,
      priorityId,
      projectId,
      assignedTo,
      dueDate,
    } = updateTaskDto;

    return this.prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status_id: statusId,
        priority_id: priorityId,
        project_id: projectId,
        assigned_to: assignedTo || userId,
        due_date: dueDate ? new Date(dueDate) : null,
      },
    });
  }

  async remove(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task || task.assigned_to !== userId) {
      throw new ForbiddenException('No puedes eliminar esta tarea');
    }

    return this.prisma.task.delete({ where: { id } });
  }
}
