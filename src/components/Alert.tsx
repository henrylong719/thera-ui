import classNames from 'classnames';
import React from 'react';

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning',
}

interface BaseAlertProps {
  className?: string;
  title: string;
  description?: string;
  alertType?: AlertType;
  closable?: boolean;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const { className, title, description, alertType, closable } = props;

  const classes = classNames('thera-alert', className, {
    [`thera-alert-${alertType}`]: alertType,
  });

  return (
    <div className={classes}>
      <div>
        <span className="thera-alert-title">{title}</span>
        {closable && <span className="thera-alert-close">close</span>}
      </div>
      {description && <p>{description}</p>}
    </div>
  );
};

Alert.defaultProps = {
  closable: true,
  alertType: AlertType.Default,
};
export default Alert;
