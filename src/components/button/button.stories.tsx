import React from 'react';
import Button from './button';

import { ComponentStory, ComponentMeta } from '@storybook/react';

const buttonMeta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default buttonMeta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Default Button',
};

Default.decorators = [
  (Story) => (
    <div style={{ margin: '50px' }}>
      <Story />
    </div>
  ),
];

Default.storyName = 'default button';

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: 'Large Button',
};
export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Small Button',
};
export const Primary = Template.bind({});
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button',
};
export const Danger = Template.bind({});
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button',
};
export const Link = Template.bind({});
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com',
};

// export const ButtonWithSize: ComponentStory<typeof Button> = (args) => (
//   <>
//     <Button size="lg" {...args}>
//       Large Button
//     </Button>
//     <Button size="sm" {...args}>
//       Small Button
//     </Button>
//   </>
// );

// ButtonWithSize.storyName = 'button with different size';

// export const ButtonWithType: ComponentStory<typeof Button> = (args) => (
//   <>
//     <Button btnType="primary" {...args}>
//       Primary Button
//     </Button>
//     <Button btnType="danger" {...args}>
//       Danger Button
//     </Button>
//     <Button btnType="link" href="https://google.com" {...args}>
//       Link Button
//     </Button>
//   </>
// );

// ButtonWithType.storyName = 'button with different type';
