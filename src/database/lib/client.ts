import { PrismaPg } from '@prisma/adapter-pg';

import { serverEnv } from '../../config/lib/env.server';
import { PrismaClient } from '../generated/prisma/client';

let db: PrismaClient | undefined;

export function getDbClient() {
  if (!db) {
    const adapter = new PrismaPg({ connectionString: serverEnv.DATABASE_URL });
    db = new PrismaClient({ adapter });
  }

  return db;
}
