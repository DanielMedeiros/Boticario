import { Test, TestingModule } from '@nestjs/testing';
import { RevendedorController } from './revendedor.controller';

describe('RevendedorController', () => {
  let controller: RevendedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevendedorController],
    }).compile();

    controller = module.get<RevendedorController>(RevendedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
