import React, { ReactNode, FC } from 'react';

export interface FormProps {
  name?: string;
  children?: ReactNode;
}

export const Form: FC<FormProps> = (props) => {
  const { name, children } = props;

  return (
    <form name={name} className="thera-form">
      {children}
    </form>
  );
};

Form.defaultProps = {
  name: 'thera-form',
};

export default Form;
