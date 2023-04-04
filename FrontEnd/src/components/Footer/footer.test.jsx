import { render } from '@testing-library/react';
import Footer from './Footer';

  it('Footer matches snapshot', () => {
    const view = render(<Footer />);
    expect(view).toMatchSnapshot();
  });
