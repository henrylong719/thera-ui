import { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
type InputSize = 'lg' | 'sm';
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepand?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepand, append, ...restProps } = props;

  const classes = classNames('input', {
    [`input-${size}`]: size,
    disabled: disabled,
  });

  return (
    <>
      {prepand}
      <input className={classes} disabled={disabled} {...restProps}></input>
      {append}
    </>
  );
};

export default Input;
