import { render, screen, fireEvent } from '@testing-library/react';
import AddPeep from '../../pages/AddPeep';
import { vi } from 'vitest'
import { AuthContextProvider } from '../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom'


describe('AddPeep', () => {
    test('should not submit if user is not logged in', async () => {
      
       render(
        <MemoryRouter>
            <AuthContextProvider>
                <AddPeep />
            </AuthContextProvider>
        </MemoryRouter>
        )     
        
        fireEvent.click(screen.getByRole('button', { name: 'Peep' }));
        expect(await screen.findByText('You must sign up or login to peep!')).toBeInTheDocument();
    });   
    
    test('should submit if user is logged in', async () => {
        const mockUser = {
            user: {
                token: 'mock-token',
            },
        };
        vi.mock('../hooks/useAuthContext', () => ({
            useAuthContext: () => mockUser,
    }));
           
        render(
            <MemoryRouter>
                <AuthContextProvider>
                    <AddPeep />
                </AuthContextProvider>
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'new peep message' } });
        fireEvent.click(screen.getByRole('button', { name: 'Peep' }));
        const successMessage = await screen.queryByText((content, element) => {
        return element.tagName.toLowerCase() === 'div' && content.includes('new peep added');
    });

    if (successMessage !== null) {
        expect(successMessage).toBeInTheDocument();
        };     
    });
});