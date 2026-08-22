import { mustGetQuery } from '@rocicorp/zero';
import { handleQueryRequest } from '@rocicorp/zero/server';
import { createFileRoute } from '@tanstack/react-router';

import { schema } from '../../../database/generated/zero/schema';
import { queries } from '../../../music/queries';

export const Route = createFileRoute('/api/zero/query')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const result = await handleQueryRequest({
          handler: (name, args) => {
            const query = mustGetQuery(queries, name);
            return query.fn({ args });
          },
          schema,
          request,
          userID: null,
        });

        return Response.json(result);
      },
    },
  },
});
