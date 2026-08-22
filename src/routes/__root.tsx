import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { getSiteName } from '../config/server/getSiteName';

const THIRTY_SECONDS = 30 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: THIRTY_SECONDS,
      refetchOnWindowFocus: false,
    },
  },
});

export { queryClient };

export const Route = createRootRoute({
  beforeLoad: async () => {
    const clientEnv = await getSiteName();
    return { clientEnv };
  },
  head: ({ match }) => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: match.context.clientEnv.SITE_NAME },
      { name: 'description', content: match.context.clientEnv.SITE_NAME },
    ],
    links: [{ rel: 'icon', href: '/favicon.svg' }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function NotFoundComponent() {
  return (
    <main>
      <div>
        <h1>404</h1>
        <p>Page not found.</p>
        <Link to="/">Go home</Link>
      </div>
    </main>
  );
}

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          <Outlet />
          <TanStackDevtools
            plugins={[
              formDevtoolsPlugin(),
              {
                name: 'TanStack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
          <ReactQueryDevtools initialIsOpen={false} />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  );
}
