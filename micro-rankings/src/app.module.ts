import { Module } from '@nestjs/common';
import { RankingsModule } from './modules/rankings/rankings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProxyRMQModule } from './modules/proxyrmq/proxyrmq.module';

@Module({
  imports: [
    RankingsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:dmlZVk61MXcvqjed@cluster.rpaax.mongodb.net/databasemicrorankings?retryWrites=true&w=majority',
    ),
    ProxyRMQModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
