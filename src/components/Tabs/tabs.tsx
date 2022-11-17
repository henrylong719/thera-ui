import classNames from 'classnames';
import React, { createContext, useState } from 'react';
import { TabItemProps } from './tabItem';

type SelectCallback = (selectedIndex: string) => void;

export interface TabsProps {
  label: string;
  defaultIndex?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSelect?: SelectCallback;
}

interface ITabsContext {
  label: string;
  index: string;
  onSelect?: SelectCallback;
}

export const TabsContext = createContext<ITabsContext>({
  index: '0',
  label: '',
});

const Tabs: React.FC<TabsProps> = (props) => {
  const { label, defaultIndex, className, style, children, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('thera-tabs', className);

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: ITabsContext = {
    label: label ? label : '',
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<any>;

      const { displayName } = childElement.type;

      if (displayName === 'TabItem') {
        return React.cloneElement(childElement, {
          index: index.toString(),
          label: label,
        });
      } else {
        console.error(
          'Warning: Menu has a child which is not a TabItem component'
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-tabs">
      <TabsContext.Provider value={passedContext}>
        {renderChildren()}
      </TabsContext.Provider>
    </ul>
  );
};

export default Tabs;
