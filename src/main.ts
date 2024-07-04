import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'SESSION_NAME_ID',
      secret: 'AHDHCNBSDHCNMWISOJDCNFH',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nestjs Tutorial')
    .setVersion('1.0')
    .addBasicAuth()
    .setDescription('Tutorial')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('apidoc', app, document);

  await app.listen(3333);
}

bootstrap();
