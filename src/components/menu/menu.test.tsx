import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';

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
  defaultOpenSubMenus: ['4'],
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
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
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
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);
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

  it('should show dropdown items when hover on subMenu', async () => {
    expect(screen.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = screen.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);

    await waitFor(() => {
      expect(screen.queryByText('drop1')).toBeVisible();
    });

    fireEvent.click(screen.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);

    await waitFor(() => {
      expect(screen.queryByText('drop1')).not.toBeVisible();
    });
  });
});

describe('test Menu and MenuItem component in vertical mode', () => {
  let wrapper2: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  >;
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup, testing-library/render-result-naming-convention
    wrapper2 = render(generateMenu(testVerProps));
    // eslint-disable-next-line testing-library/no-container
    wrapper2.container.append(createStyleFile());
  });

  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = screen.queryByText('drop1');
    expect(dropDownItem).not.toBeVisible();
    fireEvent.click(screen.getByText('dropdown'));
    expect(dropDownItem).toBeVisible();
  });
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(screen.queryByText('opened1')).toBeVisible();
  });
});
