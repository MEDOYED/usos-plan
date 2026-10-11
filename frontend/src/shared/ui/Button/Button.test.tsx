import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button.tsx';

describe('Button component', () => {
  it('renders button with children', () => {
    render(<Button>Kliknij mnie</Button>);
    expect(screen.getByRole('button', { name: /kliknij mnie/i })).toBeInTheDocument();
  });

  it('handles click events properly', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Akcja</Button>);

    await userEvent.click(screen.getByRole('button', { name: /akcja/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when disabled', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Zablokowany</Button>);

    await userEvent.click(screen.getByRole('button', { name: /zablokowany/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
