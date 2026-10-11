import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge.tsx';

const meta: Meta<typeof Badge> = {
  title: 'Shared/UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'error', 'success'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Zajęcia',
    color: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Wykład',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Ćwiczenia',
    color: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Laboratorium',
    color: 'tertiary',
  },
};
