import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ComprasRepository } from './compras.repository';
import { ComprasService } from './compras.service';
import { CashBackResultDTO } from './dto/cashback-result.dto';
import { CreateComprasDTO } from './dto/create-compras.dto';
import { EstatusCompras } from './status-compras.enum';

describe('ComprasService', () => {
  let service: ComprasService;
  let repository: ComprasRepository;
  let mockData;
  let mockDataCashBackResult;

  beforeEach(async () => {
    const comprasRepositoryMock = {
      getCompras: jest.fn(),
      hasCPF: jest.fn(),
      getComprasByCpf: jest.fn(),
      hasCodigo: jest.fn(),
      createCompras: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComprasService,
        {
          provide: ComprasRepository,
          useFactory: () => comprasRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ComprasService>(ComprasService);
    repository = module.get<ComprasRepository>(ComprasRepository);
    mockData = {
      codigo: '334455',
      cpf: '12345678900',
      data: '10--10-2010',
      valor: 120,
      status: EstatusCompras.EM_VALIDACAO
    } as CreateComprasDTO;
    mockDataCashBackResult = [
      {
        codigo: '556677',
        data: '10-10-2010',
        valor: 100,
        cashbackRecebido: 10,
        porcCashback: '10%',
        status: EstatusCompras.EM_VALIDACAO
      }
    ] as CashBackResultDTO[];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCompras()', () => {

    it('should be throw if repository throw', async () => {

      (repository.createCompras as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(service.createCompras(mockData)).rejects.toThrow(
        new InternalServerErrorException('Falha ao cadastrar uma compra'),
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.createCompras(mockData)).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await service.createCompras(mockData);
      expect(repository.createCompras).toBeCalledWith(mockData);
    });

    it('should be return hen repository return', async () => {
      (repository.createCompras as jest.Mock).mockReturnValue(mockData);
      expect(await service.createCompras(mockData)).toEqual(mockData);
    });

  });

  describe('getCompras()', () => {

    it('should be throw if repository throw', async () => {
      (repository.getCompras as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(service.getCompras()).rejects.toThrow(
        new InternalServerErrorException('Não foi possivel listar as compras'),
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.getCompras()).resolves.not.toThrow();
    });

    it('should be return hen repository return', async () => {
      (repository.getCompras as jest.Mock).mockReturnValue(mockData);
      expect(await service.getCompras()).toEqual(mockData);
    });
  });

  describe('getComprasByCpf()', () => {

    it('should be throw if repository throw', async () => {
      (repository.hasCPF as jest.Mock).mockReturnValue(
        mockData.cpf
      );

      (repository.getComprasByCpf as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(service.getComprasByCpf(mockData.cpf)).rejects.toThrow(
        new InternalServerErrorException('Não foi possivel listar as compras por cpf'),
      );
    });

    it('should be not throw if repository returns', async () => {
      (repository.hasCPF as jest.Mock).mockReturnValue(
        mockData.cpf
      );

      (repository.getComprasByCpf as jest.Mock).mockReturnValue(mockDataCashBackResult);
      await expect(service.getComprasByCpf(mockData.cpf)).resolves.not.toThrow();
    });

    it('should be return hen repository return', async () => {
      (repository.hasCPF as jest.Mock).mockReturnValue(
        mockData.cpf
      );

      (repository.getComprasByCpf as jest.Mock).mockReturnValue(mockDataCashBackResult);      
      expect(await service.getComprasByCpf(mockData.cpf)).toEqual(mockDataCashBackResult);
    });
  });

});
