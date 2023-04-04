import React from 'react'
import { render } from '@testing-library/react'
import { AuthContextProvider, authReducer } from './AuthContext'
import { vi } from 'vitest';

//tests that the useEffect is called with the correct arguments
describe('AuthContextProvider', () => {
  it('should load the user from localStorage on mount', () => {
    const user = { name: 'John Doe' }
    //mock localStorage to return the user
      const localStorageMock = {
      getItem: vi.fn(() => JSON.stringify(user)),
      setItem: vi.fn(),
      clear: vi.fn()
    }
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    })

    render(
      <AuthContextProvider>
        <div>Test</div>
      </AuthContextProvider>
    )

    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1)
    expect(localStorageMock.getItem).toHaveBeenCalledWith('user')
  })
})


describe('authReducer', () => {
  it('should return initial state', () => {
    const initialState = { user: null }
    const action = {}
    const result = authReducer(initialState, action)
    expect(result).toEqual(initialState)
  })

  it('should handle LOGIN action', () => {
    const initialState = { user: null }
    const user = { name: 'John Doe' }
    const action = { type: 'LOGIN', payload: user }
    const result = authReducer(initialState, action)
    expect(result).toEqual({ user })
  })

  it('should handle LOGOUT action', () => {
    const initialState = { user: { name: 'John Doe' } }
    const action = { type: 'LOGOUT' }
    const result = authReducer(initialState, action)
    expect(result).toEqual({ user: null })
  })
})