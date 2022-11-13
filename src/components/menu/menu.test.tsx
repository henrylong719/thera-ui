import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const generateMenu = (props: JSX.IntrinsicAttributes & MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xxx</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
        <MenuItem>drop2</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .thera-submenu {
      display: none;
    }
    .thera-submenu.menu-opened{
      display: block;
    }
  `;

  const style = document.createElement('style');
  // style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

let menuElement: HTMLElement,
  activeElement: HTMLMenuElement,
  disabledElement: HTMLMenuElement;

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup, testing-library/render-result-naming-convention
    const wrapper = render(generateMenu(testProps));
    // eslint-disable-next-line testing-library/no-container
    wrapper.container.append(createStyleFile());

    menuElement = screen.getByTestId('test-menu');
    activeElement = screen.getByText('active');
    disabledElement = screen.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('thera-menu test');
    // eslint-disable-next-line testing-library/no-node-access
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    const thirdItem = screen.getByText('xxx');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenNthCalledWith(1);
  });

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    render(generateMenu(testVerProps));
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

  it('should show dropdown items when hover on subMenu', () => {
    expect(screen.queryByText('drop1')).not.toBeVisible();
  });
});
