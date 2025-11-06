import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Example component tests
describe('Component Tests', () => {
  describe('Button Component', () => {
    it('renders button with text', () => {
      render(<button>Click me</button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      render(<button onClick={handleClick}>Click me</button>);

      fireEvent.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Form Validation', () => {
    it('shows error for invalid email', async () => {
      const TestForm = () => {
        const [error, setError] = React.useState('');

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = formData.get('email') as string;

          if (!email.includes('@')) {
            setError('Invalid email');
          }
        };

        return (
          <form onSubmit={handleSubmit}>
            <input name="email" type="text" />
            <button type="submit">Submit</button>
            {error && <span role="alert">{error}</span>}
          </form>
        );
      };

      render(<TestForm />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'invalid-email' } });
      fireEvent.click(screen.getByText('Submit'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
      });
    });
  });
});

// Import React for JSX
import React from 'react';
