/**
 * Prisma Seed Script
 * 
 * This script initializes the database with coach accounts.
 * Run with: npm run db:seed or tsx prisma/seed.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const COACH_CREDENTIALS = [
  { email: 'rob@launchpadphilly.org', password: 'lpuser1', name: 'Rob', role: 'coach' },
  { email: 'sanaa@launchpadphilly.org', password: 'lpuser2', name: 'Sanaa', role: 'coach' },
  { email: 'taheera@launchpadphilly.org', password: 'lpuser3', name: 'Taheera', role: 'coach' },
];

async function main() {
  console.log('Seeding database with coach accounts...');

  for (const coach of COACH_CREDENTIALS) {
    // Check if coach already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: coach.email },
    });

    if (existingUser) {
      console.log(`Coach ${coach.email} already exists, skipping...`);
      continue;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(coach.password, 10);

    // Create coach account
    await prisma.user.create({
      data: {
        email: coach.email,
        password: hashedPassword,
        name: coach.name,
        role: coach.role,
      },
    });

    console.log(`Created coach account: ${coach.email}`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

