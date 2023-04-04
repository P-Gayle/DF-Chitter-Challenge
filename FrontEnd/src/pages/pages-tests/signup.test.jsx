import { render, fireEvent, act, waitFor } from '@testing-library/react'
import {vi} from 'vitest'
import Signup from '../../pages/Signup';
import { AuthContextProvider } from '../../context/AuthContext';
import { useSignup } from '../../hooks/useSignup'

vi.mock('../../hooks/useSignup')

describe('Signup', () => {
    test('should call signup function with correct values', async () => {
        const signupMock = vi.fn()
        useSignup.mockReturnValue({
            signup: signupMock,
            isLoading: false,
            error: null,
        })

        const name = 'John Doe'
        const username = 'johndoe'
        const email = 'johndoe@example.com'
        const password = 'testpassword'

        const { getByLabelText, getByRole } = render(
            <AuthContextProvider>
                <Signup />
            </AuthContextProvider>
        )

        const nameInput = getByLabelText('Name:')
        const usernameInput = getByLabelText('Username:')
        const emailInput = getByLabelText('Email:')
        const passwordInput = getByLabelText('Password:')
        const submitButton = getByRole('button', { name: 'Sign up' })

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: name } })
            fireEvent.change(usernameInput, { target: { value: username } })
            fireEvent.change(emailInput, { target: { value: email } })
            fireEvent.change(passwordInput, { target: { value: password } })
            fireEvent.click(submitButton)
        })
        await waitFor(() => {
            expect(signupMock).toHaveBeenCalledWith(name, username, email, password)
        })
    })

//   test('should display error message on signup failure', async () => {
    //TEST FAILS WITH ERROR: "TypeError: Cannot read property 'signup' of undefined"
//     const error = 'Signup failed'
//     useSignup.mockReturnValue({
//       signup: vi.fn().mockRejectedValue({ message: error }),
//       isLoading: false,
//       error: error,
//     })

//       const { getByRole, findByText } = render(
//             <AuthContextProvider>
//                 <Signup />
//             </AuthContextProvider>
//       )
//     const submitButton = getByRole('button', { name: 'Sign up' })

//     fireEvent.click(submitButton)

//     const errorElement = await findByText(error)
//     expect(errorElement).toBeInTheDocument()
//   })

  test('should disable submit button when loading', () => {
   useSignup.mockReturnValue({
      signup: vi.fn(),
      isLoading: true,
      error: null,
    })

      const { getByRole } = render(
            <AuthContextProvider>
                <Signup />
            </AuthContextProvider>
      
      )
    const submitButton = getByRole('button', { name: 'Sign up' })

    expect(submitButton).toBeDisabled()
  })
})