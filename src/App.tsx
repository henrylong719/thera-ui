import Alert from './components/Alert/Alert';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import './styles/index.scss';

function App() {
  return (
    <>
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

      <Menu>
        <MenuItem>link1</MenuItem>
        <MenuItem disabled={true}>link1</MenuItem>
        <MenuItem>link1</MenuItem>
      </Menu>
    </>
  );
}

export default App;
