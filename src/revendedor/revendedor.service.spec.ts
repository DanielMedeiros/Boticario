import { Test, TestingModule } from '@nestjs/testing';
import { RevendedorService } from './revendedor.service';

describe('RevendedorService', () => {
  let service: RevendedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevendedorService],
    }).compile();

    service = module.get<RevendedorService>(RevendedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
