import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { readdir, unlink } from 'fs/promises';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const baseDir = __dirname.includes('dist')
    ? join(__dirname, '..')
    : __dirname;

  app.use('/public', express.static('public'));
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  await app.listen(3000);

  const folderPath = join(baseDir, 'public', 'uploads');

  async function handleExit(signal: string) {
    console.log(`Received ${signal}. Clearing and exiting`);
    await clearFolder(folderPath);
    process.exit();

  }

  process.on('SIGINT', handleExit);
  process.on('SIGTERM', handleExit);
}
bootstrap();

async function clearFolder(folderPath: string) {
  try {
    const files = await readdir(folderPath);
    for (const file of files) {
      await unlink(join(folderPath, file));
    }
    console.log('Folder cleared successfully');
  } catch (error) {
    console.error('Error clearing folder:', error);
  }
}
