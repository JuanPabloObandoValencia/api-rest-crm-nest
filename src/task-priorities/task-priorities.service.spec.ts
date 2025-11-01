import { Test, TestingModule } from '@nestjs/testing';
import { TaskPrioritiesService } from './task-priorities.service';

describe('TaskPrioritiesService', () => {
  let service: TaskPrioritiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskPrioritiesService],
    }).compile();

    service = module.get<TaskPrioritiesService>(TaskPrioritiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
