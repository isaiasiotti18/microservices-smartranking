import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AwsCognitoConfig } from '../aws/aws-cognito.config'
import { passportJwtSecret } from 'jwks-rsa'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private logger = new Logger(JwtStrategy.name)

  constructor(private awsCognito: AwsCognitoConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      ignoreExpiration: false,
      
      audience: awsCognito.clientId,
      
      issuer: awsCognito.authority,
      
      algorithms: ['RS256'],
      
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${awsCognito.authority}/.well-known/jwks.json`
      }),
    })
  }

  public async validate(payload: any) {

    this.logger.log(`payload: ${JSON.stringify(payload)}`)

    return {
      idUsuario: payload.sub,
      email: payload.email
    }
  }
}