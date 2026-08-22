import { mustGetMutator } from '@rocicorp/zero';
import { handleMutateRequest } from '@rocicorp/zero/server';
import { createFileRoute } from '@tanstack/react-router';

import { dbProvider } from '../../../database/lib/sync';
import { mutators } from '../../../music/mutators';

export const Route = createFileRoute('/api/zero/mutate')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const result = await handleMutateRequest({
          dbProvider,
          handler: (transact) => {
            return transact((tx, name, args) => {
              const mutator = mustGetMutator(mutators, name);
              return mutator.fn({ args, tx });
            });
          },
          request,
          userID: null,
        });

        return Response.json(result);
      },
    },
  },
});
