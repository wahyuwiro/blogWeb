import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SigninModule } from './signin/signin.module';
import { BlogModule } from './blog/blog.module';
import { SignupModule } from './signup/signup.module';
import * as redisStore from 'cache-manager-redis-store';
import { SigninService } from './signin/signin.service';
import { SigninController } from './signin/signin.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: process.env.PORT_REDIS
  }), SigninModule, BlogModule, SignupModule],
  controllers: [AppController],
  providers: [AppService, SigninService, SigninController],
})
export class AppModule {}
