import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const superAdminEmail = 'mdnaseef2004@gmail.com';
  const superAdminPassword = '123456';
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
  
  // Upsert the super admin so we can safely run the seed multiple times
  const admin = await prisma.admin.upsert({
    where: { email: superAdminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: superAdminEmail,
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  });
  
  console.log('Seed completed successfully!');
  console.log(`Super Admin Created: ${admin.email}`);
  
  // Optionally, create a sub admin too
  const subAdminEmail = 'subadmin@medicare.com';
  const subAdminPassword = await bcrypt.hash('password', 10);
  
  await prisma.admin.upsert({
    where: { email: subAdminEmail },
    update: {},
    create: {
      email: subAdminEmail,
      password: subAdminPassword,
      name: 'Sub Admin',
      role: 'SUB_ADMIN',
    },
  });
  
  console.log('Sub Admin Created: subadmin@medicare.com');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
