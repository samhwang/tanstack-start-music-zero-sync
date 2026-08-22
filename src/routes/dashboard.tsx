import { useQuery, useZero } from '@rocicorp/zero/react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { authClient } from '../auth/client';
import { auth } from '../auth/server';
import { mutators } from '../music/mutators';
import { queries } from '../music/queries';

const getSession = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });
  if (!session) return null;
  return {
    id: session.user.id,
    email: session.user.email,
  };
});

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: '/login' });
    }
    return { session };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const zero = useZero();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [albums] = useQuery(queries.albums.byArtist({ artistId: 'artist_1' }));

  const addAlbum = () => {
    zero.mutate(
      mutators.albums.create({
        id: crypto.randomUUID(),
        artistId: 'artist_1',
        title: 'ASDF1234567890',
        releaseYear: 1970,
      })
    );
  };

  return (
    <main>
      <h1>Dashboard</h1>
      {user && <p>Signed in as {user.email}</p>}

      <button type="button" onClick={() => void authClient.signOut()}>
        Sign out
      </button>

      <button onClick={addAlbum}>Add Album</button>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </main>
  );
}
