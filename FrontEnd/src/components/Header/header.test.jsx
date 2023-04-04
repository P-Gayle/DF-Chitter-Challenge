import { render } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

  it('Header matches snapshot', () => {
    expect(render(<MemoryRouter><Header /></MemoryRouter>)).toMatchSnapshot();
  });
