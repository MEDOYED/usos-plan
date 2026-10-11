import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip.tsx';

const meta: Meta<typeof Chip> = {
  title: 'Shared/UI/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Wszystkie zajęcia',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    children: 'Wykłady',
    selected: true,
  },
};
