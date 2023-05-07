import '../Sidebar/sidebar.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

//to show the user's email when logged in
import { useAuthContext } from '../../hooks/useAuthContext'

const Sidebar = () => {
    const { logout } = useLogout()

    //to show the user's email when logged in
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }
    
    return (
        <nav>
            <div className="sidebar">
              
                <nav className='nav-container'>
                    {!user && (
                    <div className='nav-container'>
                            <div className='signup'>
                            <i class="fa-solid fa-user-plus"></i>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                            <div className='login'>
                            <i class="fa-solid fa-right-to-bracket"></i>
                            <Link to="/login">Login</Link>  
                        </div>
                    </div>
                    )}

                    {user && (
                        <div className='logout'>
                            <span className='logout-email'>{user.email}</span><br></br>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                </nav>             
              
            </div>
        </nav>
    )
}

export default Sidebar