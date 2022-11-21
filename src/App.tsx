import Alert from './components/Alert/Alert';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import TabItem from './components/Tabs/tabItem';
import Tabs from './components/Tabs/tabs';
import './styles/index.scss';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Icon from './components/Icon/icon';
library.add(fas);

function App() {
  return (
    <>
      <Icon icon={'arrow-down'} theme="primary" size="10x" />
      <Button>Hello</Button>
      <Button btnType={'primary'} size={'lg'}>
        Hello two
      </Button>

      <Button btnType={'danger'} size={'lg'} disabled={true}>
        Hello three
      </Button>
      <Button btnType={'link'} href="https://www.google.com">
        Hello google
      </Button>

      <Alert
        title="this is the danger alert"
        type={'danger'}
        closable={false}
      />
      <Alert title="this is the default alert" type={'default'} />
      <Alert title="this is the success alert" type={'success'} />
      <Alert title="this is the warning alert" type={'warning'} />

      <Menu mode={'vertical'}>
        <MenuItem>link1</MenuItem>
        <MenuItem disabled={true}>link1</MenuItem>
        <MenuItem>link1</MenuItem>
      </Menu>

      <Menu
        defaultOpenSubMenus={['2']}
        onSelect={(index) => {
          alert(index);
        }}
      >
        <MenuItem>link1</MenuItem>
        <MenuItem disabled={true}>link1</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>link3</MenuItem>
          <MenuItem>link3</MenuItem>
          <MenuItem>link3</MenuItem>
        </SubMenu>
      </Menu>

      <Tabs>
        <TabItem label={'card1'}>1</TabItem>
        <TabItem label={'card2'}>2</TabItem>
        <TabItem label={'card3'}>3</TabItem>
      </Tabs>

      <Tabs type={'card'}>
        <TabItem label={'card1'}>1</TabItem>
        <TabItem label={'card2'}>2</TabItem>
        <TabItem label={'card3'}>3</TabItem>
      </Tabs>
    </>
  );
}

export default App;
