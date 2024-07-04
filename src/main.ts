import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
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
