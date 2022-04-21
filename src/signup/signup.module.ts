import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import * as redisStore from 'cache-manager-redis-store';
import { SigninService } from '../signin/signin.service';
import { SigninController } from '../signin/signin.controller';

@Module({
  imports: [HttpModule, CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: process.env.PORT_REDIS
  })],  
  providers: [SignupService, SigninService, SigninController],
  controllers: [SignupController],
  exports: [SignupService]  
})
export class SignupModule {}
