import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton.tsx';

const meta: Meta<typeof IconButton> = {
  title: 'Shared/UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'tonal', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Standard: Story = {
  args: {
    children: '★',
    ariaLabel: 'Favorite',
    variant: 'standard',
  },
};

export const Filled: Story = {
  args: {
    children: '★',
    ariaLabel: 'Favorite',
    variant: 'filled',
  },
};

export const Tonal: Story = {
  args: {
    children: '★',
    ariaLabel: 'Favorite',
    variant: 'tonal',
  },
};

export const Outlined: Story = {
  args: {
    children: '★',
    ariaLabel: 'Favorite',
    variant: 'outlined',
  },
};
