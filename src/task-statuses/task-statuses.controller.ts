import { Controller, Get } from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';

@Controller('task-statuses')
export class TaskStatusesController {
  constructor(private readonly service: TaskStatusesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
