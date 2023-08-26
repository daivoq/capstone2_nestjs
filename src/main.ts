import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupStaticMiddleware } from './middleware/static.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SearchImg } from './hinhanh/dto/search.dto';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupStaticMiddleware(app as any);

  // Thiết lập CORS
  app.enableCors();

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('API cho việc đăng ký và đăng nhập')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [SearchImg], // Đăng ký DTO SearchImg để hiển thị trong Swagger UI
  });

  SwaggerModule.setup('swagger', app, document);

  // Serve swagger-ui-dist static files
  const expressApp = express();
  expressApp.use(
    '/api/docs',
    express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')),
  );
  app.use('/api/docs', expressApp);

  await app.listen(8081);
}
bootstrap();
