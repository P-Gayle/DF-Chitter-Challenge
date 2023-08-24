import '../Footer/footer.css'
import '../../components/Sidebar/sidebar.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

import { useAuthContext } from '../../hooks/useAuthContext'



const Footer = () => {

    const { logout } = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <footer>
            <div className="footer">
                
                <p>© 2023 | Paula D Gayle</p>
           
            </div>

             <nav>
            <div className="auth-footer">
              
                <nav className='nav-container-footer'>
                    {!user && (
                    <div className='nav-container-footer'>
                            <div className='signup'>
                            <i className="fa-solid fa-user-plus"></i>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                            <div className='login'>
                            <i className="fa-solid fa-right-to-bracket"></i>
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
        </footer>

        
    )
}
            

export default Footer;