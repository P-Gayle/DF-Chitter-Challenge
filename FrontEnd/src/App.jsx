import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Home from './pages/Home'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import AddPeep from './pages/AddPeep'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddPeep />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div> 
  )
}

export default App
