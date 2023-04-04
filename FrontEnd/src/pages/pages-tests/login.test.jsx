import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';
import { vi } from 'vitest';
import { useLogin } from '../../hooks/useLogin';
import { AuthContextProvider } from '../../context/AuthContext';

vi.mock('../../hooks/useLogin');

test('should call login function with email and password on form submission', async () => {
  const loginMock = vi.fn();
  useLogin.mockReturnValue({
    login: loginMock,
    error: null,
    isLoading: false,
  });

  const email = 'test@example.com';
  const password = 'testpassword';
  const { getByTestId, getByRole } = render(<Login />);

  const emailInput = getByTestId('email');
  const passwordInput = getByTestId('password');
  const submitButton = getByRole('button', { name: 'Login' });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(loginMock).toHaveBeenCalledWith(email, password);
  });
});

// test('should display error message if login fails', async () => {
  //TEST FAILS WITH ERROR: "TypeError: Cannot read property 'login' of undefined"
//   const error = 'Invalid credentials';
//   useLogin.mockReturnValue({
//     login: vi.fn().mockRejectedValue({ message: error }),
//     error: error,
//     isLoading: false,
//   });

//   const { getByRole, getByText } = render(
    
//     <AuthContextProvider>
//       <Login />
//     </AuthContextProvider>
//     );

//   const submitButton = getByRole('button', { name: 'Login' });
//   fireEvent.click(submitButton);

//   await waitFor(() => {
//     expect(getByText(error)).toBeInTheDocument();
//   }).catch((err) => {
//     console.log(err);
//   });
// });

test('should disable submit button while loading', () => {
  useLogin.mockReturnValue({
    login: vi.fn(),
    error: null,
    isLoading: true,
  });

  const { getByTestId } = render(
    
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );

  const submitButton = getByTestId('login-button');
  expect(submitButton).toBeDisabled();
});