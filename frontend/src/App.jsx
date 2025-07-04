import { useState , createContext } from 'react'
import './App.css'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import { Routes, Route } from 'react-router-dom'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage.'
import PasswordPage from './Pages/PasswordPage'

export const Context = createContext();

function App() {

  const [key, setKey] = useState('');

  return (
    <Context.Provider value={{ key , setKey}}>
        <Routes>
          <Route index element={<LoginPage />}></Route>
          <Route path='/home' element={<HomePage />}></Route>
          <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/password' element={<PasswordPage/>}></Route>
        
        </Routes>
    </Context.Provider>
  )
}

export default App
