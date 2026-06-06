import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. FIXED CORS: Your localhost URL won't work for your live deployed frontend.
  // For now, we allow your local environment and Render's wildcard, or configure it via env variables later.
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://your-frontend-domain.vercel.app', // Add your deployed frontend URL here later
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbiddenNonWhitelisted: true, // Typo fix: NestJS uses 'forbiddenNonWhitelisted' in newer versions, check your local types if it complains
    }),
  );

  // 2. FIXED HOST: Added '0.0.0.0' so Render can route external web traffic to your container
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
