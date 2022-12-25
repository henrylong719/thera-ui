import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './input';
export default {
  title: 'Input',
  id: 'Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
export const ADefault = Template.bind({});
ADefault.args = {
  placeholder: 'Input',
};
ADefault.storyName = 'default Input';
export const BDisabled = Template.bind({});
BDisabled.args = {
  placeholder: 'disabled input',
  disabled: true,
};
BDisabled.storyName = 'disabled Input';

export const CIcon = Template.bind({});
CIcon.args = {
  placeholder: 'input with icon',
  icon: 'search',
};
CIcon.storyName = 'Input with Icon';

export const DSizeInput = () => (
  <>
    <Input defaultValue="large size" size="lg" />
    <Input placeholder="small size" size="sm" />
  </>
);
DSizeInput.storyName = 'Input with different size';
export const EPandInput = () => (
  <>
    <Input defaultValue="prepend text" prepend="https://" />
    <Input defaultValue="google" append=".com" />
  </>
);

EPandInput.storyName = 'Input with prepend or append';
