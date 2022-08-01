import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateRevendedorDTO } from './dto/create-revendedor.dto';
import { RevendedorRepository } from './revendedor.repository';
import { RevendedorService } from './revendedor.service';
import { Chance } from 'chance';
const chance = new Chance();

describe('RevendedorService', () => {
  let service: RevendedorService;
  let repository: RevendedorRepository;
  let mockData;

  beforeEach(async () => {
    const revendedorRepositoryMock = {
      createRevendedor: jest.fn(),  
      findOne: jest.fn(),   
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevendedorService,
        {
          provide: RevendedorRepository,
          useFactory: () => revendedorRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<RevendedorService>(RevendedorService);
    repository = module.get<RevendedorRepository>(RevendedorRepository);
    mockData = {
      cpf: chance.cpf(),
      email: chance.email(),
      nome: chance.string(),
      senha: '1q2w3e',
    } as CreateRevendedorDTO;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRevendedor()', () => {

    it('should be throw if repository throw', async () => {
      service.findOne as jest.Mock;
      (repository.createRevendedor as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );      
      await expect(service.createRevendedor(mockData)).rejects.toThrow(
        new InternalServerErrorException('Falha ao criar um revendedor'),
      );
    });

    it('error should be shown when email is already registered', async () => {      
      (repository.findOne as jest.Mock).mockRejectedValue(
        mockData.email
      );    

      (repository.findOne as jest.Mock).mockRejectedValue(
        new BadRequestException(`Esse email: ${mockData.email} já foi cadastrado.`),
      ); 
      await expect(service.findOne(mockData.email)).rejects.toThrow(
        new BadRequestException(`Esse email: ${mockData.email} já foi cadastrado.`),
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.createRevendedor(mockData)).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await service.createRevendedor(mockData);
      expect(repository.createRevendedor).toBeCalledWith(mockData);
    });

    it('should be return hen repository return', async () => {
      (repository.createRevendedor as jest.Mock).mockReturnValue(mockData);      
      expect(await service.createRevendedor(mockData)).toEqual(mockData);
    });

  });
});
