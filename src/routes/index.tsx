import { createFileRoute, Link } from '@tanstack/react-router';

import { authClient } from '../auth/client';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { data: session } = authClient.useSession();
  const { clientEnv } = Route.useRouteContext();
  const user = session?.user;

  return (
    <main>
      <h1>{clientEnv.SITE_NAME}</h1>
      <p>A TanStack Start + Better Auth starter template.</p>

      {user ? (
        <p>
          Signed in as <strong>{user.email}</strong>. <Link to="/dashboard">Go to dashboard</Link>
        </p>
      ) : (
        <p>
          <Link to="/login">Sign in</Link> or <Link to="/register">create an account</Link>.
        </p>
      )}
    </main>
  );
}
