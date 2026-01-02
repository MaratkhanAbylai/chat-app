import { useState } from 'react'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Main from './components/Main/Main'
import './App.css'

function App() {

  const [screen, setScreen] = useState('login');

  const [user, setUser] = useState(null);

  return (
    <>
      <div className="container">
        {screen === "login" && <Login setScreen={setScreen} setUser={setUser} />}
        {screen === "register" && <Register setScreen={setScreen} setUser={setUser} />}
        {screen === "main" && <Main />}
      </div>
    </>
  )
}

export default App;
