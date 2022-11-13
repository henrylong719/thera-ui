import classNames from 'classnames';
import React, { FunctionComponentElement } from 'react';
import { useContext } from 'react';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index?.toString(),
  });
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return childElement;
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        );
      }
    });

    return <ul className="thera-submenu">{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
