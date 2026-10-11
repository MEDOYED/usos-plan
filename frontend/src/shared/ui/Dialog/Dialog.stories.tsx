import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button.tsx';
import { Dialog } from './Dialog.tsx';

const meta: Meta<typeof Dialog> = {
  title: 'Shared/UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Szczegóły zajęć',
    children: 'Tutaj znajdują się szczegółowe informacje na temat wybranego przedmiotu.',
    onClose: () => {},
    actions: <Button variant="filled">Zamknij</Button>,
  },
};
