/**
 * Prisma Client Singleton
 * 
 * This file creates a single instance of Prisma Client to be used throughout the application.
 * In development, this prevents multiple instances from being created during hot reloading.
 * In production (Vercel), this prevents creating multiple instances across serverless function invocations.
 */

import { PrismaClient } from '@prisma/client';

// Validate DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('💡 Create a .env.local file with: DATABASE_URL="your-postgres-connection-string"');
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Cache Prisma Client in global object to prevent multiple instances
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown handler
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}

