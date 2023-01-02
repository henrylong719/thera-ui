import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Alert from './alert';

export default {
  title: 'Alert',
  id: 'Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const ADefaultAlert = Template.bind({});
ADefaultAlert.args = {
  title: 'this is alert!',
};
ADefaultAlert.storyName = 'basic style';
export const CDescAlert = Template.bind({});
CDescAlert.args = {
  title: 'title',
  description: 'this is a long description',
};
CDescAlert.storyName = 'Alert with description';
export const BStylesAlert = () => {
  return (
    <>
      <Alert title="this is Success" type="success"></Alert>
      <Alert title="this is Danger!" type="danger"></Alert>
      <Alert title="this is Warning!" type="warning" closable={false}></Alert>
    </>
  );
};
BStylesAlert.storyName = 'Alert with different style';
