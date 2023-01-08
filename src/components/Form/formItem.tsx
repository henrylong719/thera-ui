import classNames from 'classnames';
import React, { FC, ReactNode, useContext, useEffect } from 'react';
import { FormContext } from './form';

export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode;
}

const Item: FC<FormItemProps> = (props) => {
  const { label, children, name } = props;
  const { dispatch } = useContext(FormContext);

  const rowClass = classNames('thera-row', {
    'thera-row-no-label': !label,
  });

  useEffect(() => {
    dispatch({ type: 'addField', name, value: [label, name] });
  }, []);

  return (
    <div className={rowClass}>
      {label && (
        <div className="thera-form-item-label">
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="thera-form-item">{children}</div>
    </div>
  );
};

export default Item;
