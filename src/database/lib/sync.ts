import { zeroPrisma } from '@rocicorp/zero/server/adapters/prisma';

import { schema } from '../generated/zero/schema';
import { getDbClient } from './client';

const client = getDbClient();
export const dbProvider = zeroPrisma(schema, client);

declare module '@rocicorp/zero' {
  interface DefaultTypes {
    dbProvider: typeof dbProvider;
  }
}
