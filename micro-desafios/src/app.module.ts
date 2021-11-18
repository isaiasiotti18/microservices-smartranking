import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafiosModule } from './modules/desafios/desafio.module';
import { PartidasModule } from './modules/partidas/partidas.module';
import { ProxyRMQModule } from './modules/proxyrmq/proxyrmq.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:dmlZVk61MXcvqjed@cluster.rpaax.mongodb.net/desafiosdb?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    ConfigModule.forRoot({ isGlobal: true }),
    DesafiosModule,
    PartidasModule,
    ProxyRMQModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
