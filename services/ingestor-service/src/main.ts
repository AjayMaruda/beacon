import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Beacn - Ingestor Service')
    .setDescription('API for ingesting logs into the Beacon system')
    .setVersion('1.0')
    .addTag('logs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
  Logger.log(`Ingestor service is running on port ${port}.`);
}
bootstrap();
