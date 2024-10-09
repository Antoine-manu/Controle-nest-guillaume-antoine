import { Test, TestingModule } from '@nestjs/testing';
import { DabController } from './dab.controller';

describe('DabController', () => {
  let controller: DabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DabController],
    }).compile();

    controller = module.get<DabController>(DabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
