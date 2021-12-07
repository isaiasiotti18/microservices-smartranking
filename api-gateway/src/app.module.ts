import { Module } from '@nestjs/common';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { JogadoresModule } from './modules/jogadores/jogadores.module';
import { ClientProxySmartRanking } from './modules/proxyrmq/client-proxy'
import { ProxyRMQModule } from './modules/proxyrmq/proxyrmq.module';
import { AwsModule } from './modules/aws/aws.module';
import { AwsS3Service } from './modules/aws/aws-s3.service';
import { ConfigModule } from '@nestjs/config';
import { DesafiosModule } from './modules/desafios/desafios.module';
import { RankingsModule } from './modules/rankings/rankings.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    CategoriasModule,
    JogadoresModule, 
    DesafiosModule,
    ProxyRMQModule,
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RankingsModule,
    AuthModule
  ],
  controllers: [],
  providers: [ClientProxySmartRanking, AwsS3Service],
})
export class AppModule {}
