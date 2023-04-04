import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(name, username, email, password) 
    }

    return (
        <div className="signup-page">
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label htmlFor="name">Name:</label>
            <input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}

            </form>
            </div>
    )
}

export default Signup