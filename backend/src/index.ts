import 'reflect-metadata';
import { initializeDb } from './boot/typeorm';
import { initializeApp } from './boot/app';

async function bootstrap() {
  await initializeDb();
  await initializeApp()
}

bootstrap()