import { fireEvent, render, screen } from '@testing-library/react';
import Alert, { AlertProps, AlertType } from './Alert';

const testProps: AlertProps = {
  title: 'title',
  onClose: jest.fn(),
};

const typeProps: AlertProps = {
  title: 'title',
  description: 'description',
  type: 'success' as AlertType,
  onClose: jest.fn(),
  closable: false,
};

describe('test alert component', () => {
  it('should render the correct default alert banner', () => {
    const { container } = render(<Alert {...testProps}></Alert>);

    const element = screen.getByText('title');

    expect(element).toBeInTheDocument();

    expect(element).toHaveClass('thera-alert-title');

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.thera-alert')).toHaveClass(
      'thera-alert-default'
    );
  });

  it('should hide when close span is clicked', () => {
    render(<Alert {...testProps}></Alert>);

    const element = screen.getByText('close');

    expect(element).toBeInTheDocument();

    fireEvent.click(element);

    expect(testProps.onClose).toHaveBeenCalled();

    expect(screen.queryByText('title')).not.toBeInTheDocument();
  });

  it('should render correct alert based on different type and description', () => {
    const { container } = render(<Alert {...typeProps}></Alert>);

    const element = screen.getByText('title');

    expect(element).toHaveClass('bold-title');

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.thera-alert')).toHaveClass(
      'thera-alert-success'
    );

    expect(screen.getByText('description')).toBeInTheDocument();

    expect(screen.queryByText('close')).not.toBeInTheDocument();
  });
});
