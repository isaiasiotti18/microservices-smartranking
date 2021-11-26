import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientProxySmartRanking {
  constructor(private configService: ConfigService) {}

  private RABBITMQ_USER = this.configService.get<string>('RABBITMQ_USER');
  private RABBITMQ_PASSWORD =
    this.configService.get<string>('RABBITMQ_PASSWORD');
  private RABBITMQ_URL = this.configService.get<string>('RABBITMQ_URL');

  private URL = `amqp://${this.RABBITMQ_USER}:${this.RABBITMQ_PASSWORD}@${this.RABBITMQ_URL}`;

  getClientProxyAdminBackendInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.URL],
        queue: 'admin-backend',
      },
    });
  }

  getClientProxyDesafiosInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.URL],
        queue: 'desafios',
      },
    });
  }

  getClientProxyRankingsInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.URL],
        queue: 'rankings',
      },
    });
  }
}
