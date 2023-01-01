import React from 'react';
import { Button, Icon, Menu, Tabs } from 'thera-ui';

function App() {
  return (
    <div className="App">
      <Button>Hello</Button>
      <Button btnType={'primary'} size={'lg'}>
        Hello two
      </Button>
      <Icon icon={'arrow-down'} theme="primary" size="10x" />

      <Menu mode={'vertical'}>
        <Menu.Item>link1</Menu.Item>
        <Menu.Item disabled={true}>link1</Menu.Item>
        <Menu.Item>link1</Menu.Item>
      </Menu>

      <Menu
        defaultOpenSubMenus={['2']}
        onSelect={(index: any) => {
          alert(index);
        }}
      >
        <Menu.Item>link1</Menu.Item>
        <Menu.Item disabled={true}>link1</Menu.Item>
        <Menu.SubMenu title="dropdown">
          <Menu.Item>link3</Menu.Item>
          <Menu.Item>link3</Menu.Item>
          <Menu.Item>link3</Menu.Item>
        </Menu.SubMenu>
      </Menu>

      <Tabs>
        <Tabs.Item label={'card1'}>1</Tabs.Item>
        <Tabs.Item label={'card2'}>2</Tabs.Item>
        <Tabs.Item label={'card3'}>3</Tabs.Item>
      </Tabs>

      <Tabs type={'card'}>
        <Tabs.Item label={'card1'}>1</Tabs.Item>
        <Tabs.Item label={'card2'}>2</Tabs.Item>
        <Tabs.Item label={'card3'}>3</Tabs.Item>
      </Tabs>
    </div>
  );
}

export default App;
