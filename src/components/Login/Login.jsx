import { useState } from "react"
import './Login.modules.css'

function Login({ setScreen }) {
    
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    async function handleClick() {
        const data = {
            username: nameValue,
            password: passwordValue
        }

        const response = await fetch('link to bd', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        });

        setNameValue('');
        setPasswordValue('');
    }

    function changeComponent() {
        setScreen('register');
    }

    return <>
        <div className="login">
            <input type="text"
             value={nameValue}
             onChange={e => setNameValue(e.target.value)}
             placeholder="Введите логин"
            />
            <input type="password" 
             value={passwordValue}
             onChange={e => setPasswordValue(e.target.value)}
             placeholder="Введите пароль"
            />
            <button type="submit" onClick={handleClick}>Войти</button>
            <p>или</p>
            <button onClick={changeComponent}>Зарегистрироваться</button>
        </div>
    </>
}

export default Login;