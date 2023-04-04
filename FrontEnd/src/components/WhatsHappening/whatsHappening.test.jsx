import News from './News';
import { render, screen, waitFor } from '@testing-library/react';
import Whatshappening from './WhatsHappening';
import mockNewsData from '../../../mockNewsData.json'
import axios from 'axios';
import { vi } from 'vitest';

test('renders headline', () => {
    const { getByTestId } = render(<News headline="headline" />);
    const headlineElement = getByTestId('headline-title');
    expect(headlineElement).toBeInTheDocument();
    expect(headlineElement).toHaveTextContent('headline');
});

vi.mock('axios');

describe('Whats happening component', () => {
   
    beforeEach(() => {
 
        axios.get.mockResolvedValue({ data: mockNewsData });
    });

    //Cleanup
    afterEach(() => {

        vi.clearAllMocks();

    });

    test('renders the loading message', async () => {
        render(<Whatshappening />);
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });
    });
    
    test('renders an error message when the API call fails', async () => {
    axios.get.mockRejectedValue('API is down');

    render(<Whatshappening />);
    const errorMessage = await screen.findByText('Error fetching data');
    expect(errorMessage).toBeInTheDocument();
    });
});


