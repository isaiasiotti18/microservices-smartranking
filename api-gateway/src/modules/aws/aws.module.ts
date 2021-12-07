import { Module } from '@nestjs/common';
import { AwsCognitoConfig } from './aws-cognito.config';
import { AwsCognitoService } from './aws-cognito.service';
import { AwsS3Service } from './aws-s3.service';

@Module({
  providers: [AwsS3Service, AwsCognitoConfig, AwsCognitoService],
  exports: [AwsS3Service, AwsCognitoConfig, AwsCognitoService],
})
export class AwsModule {}
