import classNames from 'classnames';
import React from 'react';

type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onSelect?: (selectedIndex: number) => void;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, defaultIndex, children } = props;
  const classes = classNames('thera-menu', className, {
    'menu-vertical': mode === 'vertical',
  });

  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;
