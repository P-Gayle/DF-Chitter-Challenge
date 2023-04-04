import '../Header/header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className="container">
                <img src="/images/chitterLogo.png" alt="logo" />
                <Link to="/">
                    <h1>Chitter</h1>
                </Link>
            </div>
        </header>
    )
}

export default Header