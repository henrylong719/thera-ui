import classNames from 'classnames';
import React, { FC, ReactNode, useContext, useEffect } from 'react';
import { FormContext } from './form';

export type PartialRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;

export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode;
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (event: any) => any;
}

const FormItem: FC<FormItemProps> = (props) => {
  const { label, children, name, valuePropName, trigger, getValueFromEvent } =
    props as PartialRequired<
      FormItemProps,
      'getValueFromEvent' | 'trigger' | 'valuePropName'
    >;
  const { dispatch, fields, initialValues, validateField } =
    useContext(FormContext);

  const rowClass = classNames('thera-row', {
    'thera-row-no-label': !label,
  });

  useEffect(() => {
    const value = (initialValues && initialValues[name]) || '';
    dispatch({ type: 'addField', name, value: { label, name, value } });
  }, []);

  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent && getValueFromEvent(e);
    console.log('new value', value);
    dispatch({ type: 'updateValue', name, value });
  };

  // 1. manually create a props list, includes value and onChange
  const controlProps: Record<string, any> = {};
  controlProps[valuePropName!] = value;
  controlProps[trigger!] = onValueUpdate;

  const childList = React.Children.toArray(children);

  if (childList.length === 0) {
    console.error(
      'No child element found in Form.Item, please provide one form component'
    );
  }

  if (childList.length > 1) {
    console.warn(
      'Only support one child element in Form.Item, others will be omitted'
    );
  }

  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element');
  }

  const child = childList[0] as React.ReactElement;
  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  });

  return (
    <div className={rowClass}>
      {label && (
        <div className="thera-form-item-label">
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="thera-form-item">{returnChildNode}</div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  getValueFromEvent: (e) => e.target.value,
};

export default FormItem;
