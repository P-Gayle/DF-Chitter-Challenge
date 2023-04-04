import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../hooks/useAuthContext');
vi.mock('../../hooks/useLogout', () => ({
  useLogout: vi.fn(() => ({
    logout: vi.fn(),
  })),
}));

describe('Sidebar', () => {
  it('renders the login and signup links when the user is not logged in', () => {
    // Mock the useAuthContext hook
    useAuthContext.mockReturnValue({ user: null });

    // Render the Sidebar component
    render((<MemoryRouter><Sidebar /></MemoryRouter>));

    // Check that the login and signup links are present
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });

  it('renders the logout button when the user is logged in', () => {
    // Mock the useAuthContext and useLogout hooks
    useAuthContext.mockReturnValue({ user: { email: 'test@example.com' } });
    const { logout } = useLogout();

    // Render the Sidebar component
    render((<MemoryRouter><Sidebar /></MemoryRouter>));

    // Check that the logout button is present
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });

  it('Header matches snapshot', () => {
    expect(render(<MemoryRouter><Sidebar /></MemoryRouter>)).toMatchSnapshot();
  });
});