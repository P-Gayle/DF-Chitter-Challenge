import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom" 

const AddPeep = () => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must me logged in to add a peep')
            return
        }

        const newPeep = { message }
        
        const response = await fetch('http://localhost:4000/api/peeps', {
            method: 'POST', 
            body: JSON.stringify(newPeep),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyField(json.emptyField)
        }

         if (response.ok) {
             setError(null)
             setMessage('')
             setEmptyField([])
             console.log('new peep added', json)
        }

        navigate(-1);   
    }
    
    return (
        <div className="add-container">
        <form className="create" onSubmit={handleSubmit}>
            {!user && (
                <p>You must sign up or login to peep!</p>
            )}
            <h3>What do you want to tell the world...</h3>
            <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className={emptyField.includes('message') ? 'error' : ''}
            />
            <button>Peep</button>
            {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default (AddPeep);