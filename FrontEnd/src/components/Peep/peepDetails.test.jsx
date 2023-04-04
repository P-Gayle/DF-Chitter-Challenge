import { render, screen } from '@testing-library/react';
import PeepDetails from './PeepDetails';

const peep = {
  createdAt: '2022-03-23T10:30:00Z',
  message: 'Hello, World!'
};

  describe('PeepDetails component', () => {
    test('displays the formatted date and peep message', () => {
      render(<PeepDetails peep={peep} />);
      expect(screen.getByText('March 23, 2022 10:30 AM')).toBeInTheDocument();
      expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    });
 
  });

