import type { TestHelpers } from 'better-auth/plugins';
import { describe, expect, it } from 'vitest';

import { auth } from './server';

async function getTestHelpers(): Promise<TestHelpers> {
  const ctx = await auth.$context;
  return (ctx as unknown as { test: TestHelpers }).test;
}

describe('auth (Better Auth + Prisma)', () => {
  it('creates a user and reads the session back', async () => {
    const test = await getTestHelpers();
    const user = await test.saveUser(test.createUser({ email: 'test@example.com', name: 'Test User', emailVerified: true }));
    const headers = await test.getAuthHeaders({ userId: user.id });
    const session = await auth.api.getSession({ headers });

    expect(session?.user.email).toBe('test@example.com');
  });

  it('returns null session for unauthenticated request', async () => {
    const session = await auth.api.getSession({ headers: new Headers() });

    expect(session).toBeNull();
  });
});
