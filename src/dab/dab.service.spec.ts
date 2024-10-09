import { Test, TestingModule } from '@nestjs/testing';
import { DabService } from './dab.service';

describe('DabService', () => {
  let service: DabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DabService],
    }).compile();

    service = module.get<DabService>(DabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
