import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SigninModule } from './signin/signin.module';
import { BlogModule } from './blog/blog.module';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [HttpModule, ConfigModule.forRoot(), CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: process.env.PORT_REDIS
  }), SigninModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
