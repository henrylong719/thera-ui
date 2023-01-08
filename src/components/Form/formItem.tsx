import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

export interface FormItemProps {
  label?: string;
  children?: ReactNode;
}

const Item: FC<FormItemProps> = (props) => {
  const { label, children } = props;

  const rowClass = classNames('thera-row', {
    'thera-row-no-label': !label,
  });

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
