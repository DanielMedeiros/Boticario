import { Injectable, Logger } from '@nestjs/common';
import { CashBackAcumuladoDTO } from './dto/cashback-acumulado.dto';
const axios = require('axios');

@Injectable()
export class CashbackService {

    private readonly logger = new Logger(CashbackService.name);

    async getCashBackAcumulado(): Promise<CashBackAcumuladoDTO> {

        const url = 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323';
        const config = {
            headers: {
                token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'
            }
        };

        try {
            const { data } = await axios.get(url, config);
            this.logger.log(`Cashback acumulado: ${data.body.credit}`);
            return data.body;

        } catch (error) {
            console.log(error.response);
        }

    }
}
