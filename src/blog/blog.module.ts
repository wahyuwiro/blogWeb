import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import * as redisStore from 'cache-manager-redis-store';
import { SigninService } from '../signin/signin.service';
import { SigninController } from '../signin/signin.controller';

@Module({
  imports: [HttpModule, CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: process.env.PORT_REDIS
  })],
  providers: [BlogService, SigninService, SigninController],
  controllers: [BlogController],
  exports: [BlogService]
})
export class BlogModule {}
