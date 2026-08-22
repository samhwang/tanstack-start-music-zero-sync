import { defineQueries, defineQuery } from '@rocicorp/zero';
import { z } from 'zod';

import { zql } from '../database/generated/zero/schema';

export const queries = defineQueries({
  albums: {
    byArtist: defineQuery(z.object({ artistId: z.string() }), ({ args }) => {
      return zql.Album.where('artistId', args.artistId)
        .orderBy('releaseYear', 'desc')
        .limit(10)
        .related('artist', (q) => q.one());
    }),
  },
});
