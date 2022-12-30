import React from 'react';
import { ComponentMeta } from '@storybook/react';

import Select from './index';
export default {
  title: 'Select',
  component: Select,
  id: 'Select',
  subcomponents: { Option: Select.Option },
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Select>;

export const ADefaultSelect = (args: any) => (
  <Select {...args} placeholder="please select">
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="disabled" disabled />
    <Select.Option value="nihao5" />
  </Select>
);
ADefaultSelect.storyName = 'default Select';
export const BMultipleSelect = (args: any) => (
  <Select {...args} placeholder="support multiple" multiple>
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="thera" />
    <Select.Option value="thera2" />
  </Select>
);
BMultipleSelect.storyName = 'support multiple Select';
export const CDisabledSelect = (args: any) => (
  <Select {...args} placeholder="disabled!" disabled>
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
  </Select>
);
CDisabledSelect.storyName = 'disabled Select';
