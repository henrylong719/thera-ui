import classNames from 'classnames';
import React, { FunctionComponentElement, ReactNode, useState } from 'react';
import { TabItemProps } from './tabItem';

export interface TabsProps {
  defaultIndex?: number;
  className?: string;
  children?: ReactNode;
  type?: 'line' | 'card';
  onSelect?: (selectedIndex: number) => void;
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { defaultIndex, className, children, type, onSelect } = props;

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (
    e: React.MouseEvent,
    index: number,
    disabled: boolean | undefined
  ) => {
    if (!disabled) {
      setActiveIndex(index);
      if (onSelect) {
        onSelect(index);
      }
    }
  };

  const navClass = classNames('thera-tabs-nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  });

  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames('thera-tabs-nav-item', {
        'is-active': activeIndex === index,
        disabled: disabled,
      });
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => {
            handleClick(e, index, disabled);
          }}
        >
          {label}
        </li>
      );
    });
  };
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child;
      }
    });
  };
  return (
    <div className={`thera-tabs ${className}`}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="thera-tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line',
};
export default Tabs;
