import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Menu from './index';

export default {
  title: 'Menu',
  id: 'Menu',
  component: Menu,
  subcomponents: { SubMenu: Menu.SubMenu, Item: Menu.Item },
} as ComponentMeta<typeof Menu>;

export const DefaultMenu: ComponentStory<typeof Menu> = (args) => (
  <Menu defaultIndex="0" {...args}>
    <Menu.Item>link 1</Menu.Item>
    <Menu.Item>link 2</Menu.Item>
    <Menu.Item disabled>disabled</Menu.Item>
    <Menu.SubMenu title="more">
      <Menu.Item>1</Menu.Item>
      <Menu.Item>2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

DefaultMenu.storyName = 'Default Menu';

export const BClickMenu: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args} defaultIndex="0" mode="vertical">
    <Menu.Item>link 1</Menu.Item>
    <Menu.Item>link 2</Menu.Item>
    <Menu.SubMenu title="more">
      <Menu.Item>1</Menu.Item>
      <Menu.Item>2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);
BClickMenu.storyName = 'Vertical Menu';

export const COpenedMenu: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args} defaultIndex="0" mode="vertical" defaultOpenSubMenus={['2']}>
    <Menu.Item>link 1</Menu.Item>
    <Menu.Item>link 2</Menu.Item>
    <Menu.SubMenu title="more">
      <Menu.Item>1</Menu.Item>
      <Menu.Item>2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);
COpenedMenu.storyName = ' Opened Menu';
