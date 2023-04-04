import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password) 
    }

    return (
        <div className="login-container">
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>
           
            <label htmlFor="email">Email:</label>
            <input
                data-testid="email"
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label htmlFor="password">Password:</label>
            <input
                data-testid="password"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
        
            <button disabled={isLoading} data-testid="login-button">Login</button>

            {error && <div className="error">{error}</div>}

            </form>
            </div>
    )
}

export default Login