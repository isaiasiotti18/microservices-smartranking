import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ClientProxySmartRanking {

    getClientProxyAdminBackendInstance(): ClientProxy {        

            return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://user:SUpXC6m447kF@54.234.76.121:5672/smartranking'],
              queue: 'admin-backend'
            }
          })



    }

}