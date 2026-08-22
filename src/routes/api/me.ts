import { createFileRoute } from '@tanstack/react-router';

import { ensureAuthenticated } from '../../auth/server/lib';

export const Route = createFileRoute('/api/me')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const user = await ensureAuthenticated();
          return Response.json({ user });
        } catch {
          return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
      },
    },
  },
});
