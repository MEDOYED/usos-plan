import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card.tsx';

const meta: Meta<typeof Card> = {
  title: 'Shared/UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'filled', 'outlined'],
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  args: {
    children: 'Elevated Card Content',
    variant: 'elevated',
  },
};

export const Filled: Story = {
  args: {
    children: 'Filled Card Content',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Card Content',
    variant: 'outlined',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Clickable Interactive Card',
    variant: 'elevated',
    interactive: true,
  },
};
