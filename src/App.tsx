import React from 'react';
import Alert, { AlertType } from './components/Alert';
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

      <Alert
        title="this is the danger alert"
        alertType={AlertType.Danger}
        closable={false}
      />
      <Alert title="this is the default alert" alertType={AlertType.Default} />
      <Alert title="this is the success alert" alertType={AlertType.Success} />
      <Alert title="this is the warning alert" alertType={AlertType.Warning} />
    </>
  );
}

export default App;
