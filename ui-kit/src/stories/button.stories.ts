import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from 'projects/rss-ui-kit/button';
import { SEVERITY, SIZE } from 'projects/rss-ui-kit/button/src/button.types';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      options: Object.values(SEVERITY),
      control: { type: 'radio' },
    },
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    raised: {
      control: { type: 'boolean' },
    },
    rounded: {
      control: { type: 'boolean' },
    },
    variant: {
      options: ['text', 'outlined', 'default'],
      control: { type: 'radio' },
    },
    icon: {
      control: { type: 'text' },
    },
    iconPosition: {
      options: ['left', 'right', 'top', 'bottom'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

const Default: Story = {
  args: {
    label: 'Default',
    severity: SEVERITY.PRIMARY,
    size: SIZE.NORMAL,
    disabled: false,
    raised: false,
    rounded: false,
    icon: 'rss-user',
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    label: 'Primary',
    severity: SEVERITY.PRIMARY,
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    label: 'Secondary',
    severity: SEVERITY.SECONDARY,
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    label: 'Success',
    severity: SEVERITY.SUCCESS,
  },
};

export const Info: Story = {
  args: {
    ...Default.args,
    label: 'Info',
    severity: SEVERITY.INFO,
  },
};

export const Warn: Story = {
  args: {
    ...Default.args,
    label: 'Warn',
    severity: SEVERITY.WARN,
  },
};

export const Danger: Story = {
  args: {
    ...Default.args,
    label: 'Danger',
    severity: SEVERITY.DANGER,
  },
};

export const Contrast: Story = {
  args: {
    ...Default.args,
    label: 'Contrast',
    severity: SEVERITY.CONTRAST,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    label: 'Small',
  },
};

export const Normal: Story = {
  args: {
    ...Default.args,
    label: 'Normal',
    size: SIZE.NORMAL,
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    label: 'Large',
    size: SIZE.LARGE,
  },
};
