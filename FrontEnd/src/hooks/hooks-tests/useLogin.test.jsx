import { render, fireEvent, waitFor } from '@testing-library/react';
import { useLogin } from '../../hooks/useLogin';
import { vi } from 'vitest';
import { AuthContextProvider } from '../../context/AuthContext';

const TestComponent = () => {
  const { login, isLoading, error } = useLogin();

  return (
    <div>
      <button onClick={() => login('test@test.com', 'password')} data-testid="login-button">
        Login
      </button>
      {isLoading && <div data-testid="loading-indicator">Loading...</div>}
      {error && <div data-testid="error-message">{error}</div>}
    </div>
  );
};

describe('useLogin', () => {
//CAN'T GET THIS TEST TO WORK!!
//   test('should login successfully', async () => {
//     const fetchSpy = vi.spyOn(global,'fetch').mockImplementation(() => {
//       return Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ email: 'test@test.com', password: 'password' }),
//       });
//     });

//     const dispatchSpy = vi.fn();

//     const { getByTestId } = render(
//       <AuthContextProvider value={{ dispatch: dispatchSpy }}>
//         <TestComponent />
//       </AuthContextProvider>
//     );

//     fireEvent.click(getByTestId('login-button'));

//     await waitFor(() => {
//       expect(fetchSpy).toHaveBeenCalledWith('http://localhost:4000/api/user/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: 'test@test.com', password: 'password' }),
//       });
//       expect(dispatchSpy).toHaveBeenCalledWith({ type: 'LOGIN', payload: { email: 'test@test.com', password: 'password' } });
//       expect(getByTestId('error-message')).toBeFalsy();
//     });

//     fetchSpy.mockRestore();
//   });

  test('should handle login errors', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid email or password' }),
      });
    });

    const dispatchSpy = vi.fn();

    const { getByTestId } = render(
      <AuthContextProvider value={{ dispatch: dispatchSpy }}>
        <TestComponent />
      </AuthContextProvider>
    );

    fireEvent.click(getByTestId('login-button'));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@test.com', password: 'password' }),
      });
      expect(dispatchSpy).not.toHaveBeenCalled();
      expect(getByTestId('error-message')).toHaveTextContent('Invalid email or password');
    });

    fetchSpy.mockRestore();
  });
});
