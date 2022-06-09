import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
   log: ['query'], // as querys são mostradas no terminal
});
