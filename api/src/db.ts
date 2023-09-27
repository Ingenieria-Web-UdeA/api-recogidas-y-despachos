import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

const getDB = () => {
  if (!db) {
    db = new PrismaClient();
  }

  return db;
};

export { getDB };
