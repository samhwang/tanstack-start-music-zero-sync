import type { ReactNode } from 'react';

import { useFieldContext } from '../hooks/useAuthForm';

interface AuthFieldProps {
  label: string;
  type: string;
  placeholder: string;
  leftIcon?: ReactNode;
}

export default function AuthField({ label, type, placeholder, leftIcon }: AuthFieldProps) {
  const field = useFieldContext<string>();
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <div>
        {leftIcon}
        <input
          id={field.name}
          name={field.name}
          type={type}
          autoComplete={field.name}
          required
          placeholder={placeholder}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}
