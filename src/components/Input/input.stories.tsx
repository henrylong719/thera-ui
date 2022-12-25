import Input from './input';

import { ComponentStory, ComponentMeta } from '@storybook/react';

const inputMeta: ComponentMeta<typeof Input> = {
  title: 'Input',
  component: Input,
};

export default inputMeta;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};
