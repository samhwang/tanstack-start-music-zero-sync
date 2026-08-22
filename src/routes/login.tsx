import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import * as z from 'zod';

import { authClient } from '../auth/client';
import { useAuthForm } from '../auth/hooks/useAuthForm';

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useAuthForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });
      if (error) {
        setError(error.message ?? 'Sign in failed');
        return;
      }
      await navigate({ to: '/dashboard' });
    },
  });

  return (
    <main>
      <h1>Sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppField name="email">{(field) => <field.AuthField label="Email" type="email" placeholder="you@example.com" />}</form.AppField>
        <form.AppField name="password">{(field) => <field.AuthField label="Password" type="password" placeholder="••••••••" />}</form.AppField>

        {error && <p>{error}</p>}

        <button type="submit" disabled={form.state.isSubmitting}>
          Sign in
        </button>
      </form>
    </main>
  );
}
