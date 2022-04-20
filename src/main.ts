import { NestFactory } from '@nestjs/core';
// import {ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import flash = require('connect-flash');
import * as exphbs from 'express-handlebars';
import * as passport from 'passport';
import * as hbs from 'hbs';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { urlencoded, json } from 'express';
// import 'dotenv/config';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );
  const viewsPath = join(__dirname, '../public/views');
  app.useStaticAssets(viewsPath);

  app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs', defaultLayout: 'main' 
  }));
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
 
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  // app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors();

  await app.listen(process.env.PORT);
  console.log('PORT =>',process.env.PORT)
}
bootstrap();
