import classNames from 'classnames';
import React, { useState } from 'react';
import Icon from '../Icon/icon';
import Transition from '../Transition';

export type AlertType = 'success' | 'default' | 'danger' | 'warning';

export interface AlertProps {
  title: string;
  description?: string;
  type?: AlertType;
  onClose?: () => void;
  closable?: boolean;
}

const Alert: React.FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false);

  const { title, description, type, onClose, closable } = props;

  const classes = classNames('thera-alert', {
    [`thera-alert-${type}`]: type,
  });

  const titleClass = classNames('thera-alert-title', {
    'bold-title': description,
  });

  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setHide(true);
  };

  return (
    <Transition in={!hide} timeout={300} animation="zoom-in-top">
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="thera-alert-desc">{description}</p>}
        {closable && (
          <span className="thera-alert-close" onClick={handleClose}>
            <Icon icon="times" />
          </span>
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  closable: true,
  type: 'default',
};

export default Alert;
