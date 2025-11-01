import { Controller, Get } from '@nestjs/common';
import { TaskPrioritiesService } from './task-priorities.service';

@Controller('task-priorities')
export class TaskPrioritiesController {
  constructor(private readonly service: TaskPrioritiesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
