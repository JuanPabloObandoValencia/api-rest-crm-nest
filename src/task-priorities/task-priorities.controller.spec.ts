import { Test, TestingModule } from '@nestjs/testing';
import { TaskPrioritiesController } from './task-priorities.controller';
import { TaskPrioritiesService } from './task-priorities.service';

describe('TaskPrioritiesController', () => {
  let controller: TaskPrioritiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskPrioritiesController],
      providers: [TaskPrioritiesService],
    }).compile();

    controller = module.get<TaskPrioritiesController>(TaskPrioritiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
