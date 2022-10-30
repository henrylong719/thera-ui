import react from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './Button';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps = {
  btnType: 'primary' as ButtonType,
  size: 'lg' as ButtonSize,
  className: 'testClass',
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('test button component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Test</Button>);

    const element = screen.getByText('Test') as HTMLButtonElement;

    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Test</Button>);
    const element = screen.getByText('Test') as HTMLButtonElement;
    expect(element).toBeInTheDocument();

    expect(element).toHaveClass('btn-primary btn-lg testClass');
  });

  it('should render a link when btnType equals link and href is provided', () => {
    render(
      <Button btnType="link" href="mocklink.com">
        Link
      </Button>
    );
    const element = screen.getByText('Link') as HTMLButtonElement;
    expect(element).toBeInTheDocument();

    expect(element.tagName).toEqual('A');

    expect(element).toHaveClass('btn btn-link');
  });

  it('should render disable button when disabled set to true', () => {
    render(<Button {...disabledProps}>Test</Button>);
    const element = screen.getByText('Test') as HTMLButtonElement;
    expect(element).toBeInTheDocument();

    expect(element.disabled).toEqual(true);

    fireEvent.click(element);

    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
