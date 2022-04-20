import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SigninController } from './signin.controller';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [HttpModule, CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: process.env.PORT_REDIS
  })],
  providers: [SigninService],
  controllers: [SigninController],
  exports: [SigninService]
})
export class SigninModule {}
