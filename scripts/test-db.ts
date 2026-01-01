/**
 * Test Database Connection Script
 * 
 * Run with: npx tsx scripts/test-db.ts
 * Or: npm run test:db (if you add it to package.json)
 */

import { prisma } from '../lib/prisma';

async function testDatabase() {
  console.log('🔍 Testing database connection...\n');

  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!\n');

    // Test query
    const userCount = await prisma.user.count();
    console.log(`📊 Current users in database: ${userCount}\n`);

    // Test transaction count
    const transactionCount = await prisma.transaction.count();
    console.log(`📊 Current transactions in database: ${transactionCount}\n`);

    // Test goal count
    const goalCount = await prisma.goal.count();
    console.log(`📊 Current goals in database: ${goalCount}\n`);

    console.log('✅ All database tests passed!');
  } catch (error: any) {
    console.error('❌ Database connection failed!');
    console.error('Error:', error.message);
    
    if (error.code === 'P1001') {
      console.error('\n💡 Tip: Make sure your DATABASE_URL in .env.local is correct');
      console.error('💡 Tip: Make sure your database server is running');
    } else if (error.code === 'P1003') {
      console.error('\n💡 Tip: The database does not exist. Create it first.');
    } else if (error.code === 'P1017') {
      console.error('\n💡 Tip: Database connection closed. Check your connection string.');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();

