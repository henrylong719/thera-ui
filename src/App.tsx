import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button';
import './styles/index.scss';

function App() {
  return (
    <>
      <Button>Hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Hello two
      </Button>

      <Button
        btnType={ButtonType.Danger}
        size={ButtonSize.Large}
        disabled={true}
      >
        Hello three
      </Button>
      <Button btnType={ButtonType.Link} href="https://www.google.com">
        Hello google
      </Button>
    </>
  );
}

export default App;
