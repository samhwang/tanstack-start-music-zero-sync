import { getRequestHeaders } from '@tanstack/react-start/server';

import { auth } from '../server';

export async function getSessionFromRequest() {
  const headers = getRequestHeaders();
  return auth.api.getSession({ headers });
}

export async function ensureAuthenticated() {
  const session = await getSessionFromRequest();
  if (!session) throw new Error('error.auth.loginRequired');
  return session.user;
}
