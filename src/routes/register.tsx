import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import * as z from 'zod';

import { authClient } from '../auth/client';
import { useAuthForm } from '../auth/hooks/useAuthForm';

const RegisterSchema = z
  .object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});

function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useAuthForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: RegisterSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      const { error } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });
      if (error) {
        setError(error.message ?? 'Sign up failed');
        return;
      }
      await navigate({ to: '/dashboard' });
    },
  });

  return (
    <main>
      <h1>Create an account</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppField name="name">{(field) => <field.AuthField label="Name" type="text" placeholder="Jane Doe" />}</form.AppField>
        <form.AppField name="email">{(field) => <field.AuthField label="Email" type="email" placeholder="you@example.com" />}</form.AppField>
        <form.AppField name="password">{(field) => <field.AuthField label="Password" type="password" placeholder="At least 8 characters" />}</form.AppField>
        <form.AppField name="confirmPassword">
          {(field) => <field.AuthField label="Confirm password" type="password" placeholder="Repeat password" />}
        </form.AppField>

        {error && <p>{error}</p>}

        <button type="submit" disabled={form.state.isSubmitting}>
          Create account
        </button>
      </form>
    </main>
  );
}
