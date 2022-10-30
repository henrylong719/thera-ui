import React from 'react';
import Alert from './components/alert/Alert';
import Button from './components/button/Button';
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
    </>
  );
}

export default App;
