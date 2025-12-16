import { useState } from 'react'
import Authorization from './components/Authorization'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Main from './components/Main/Main'
import './App.css'

function App() {

  const [screen, setScreen] = useState('auth');

  return (
    <>
      <div className="container">
        {/* {screen === "auth" && <Authorization setScreen={setScreen} />}
        {screen === "login" && <Login setScreen={setScreen}/>}
        {screen === "register" && <Register setScreen={setScreen} />}
        {screen === "main" && <Main />} */}
        <Main />
      </div>
    </>
  )
}

export default App;
