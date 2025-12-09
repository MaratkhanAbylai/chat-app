import { useState } from "react";

function Register({ setScreen }) {
    
    const [login, setLogin] = useState('');
    const [passwordFirst, setPasswordFirst] = useState('');
    const [passwordSecond, setPasswordSecond] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        if(passwordFirst !== passwordSecond) {
            alert('Пароли не совпадают');
            setPasswordFirst('');
            setPasswordSecond('');
            return;
        }

        try {

            setLoading(true);

            const data = {
                username: login,
                password: passwordFirst
            }

            const response = await fetch("link to bd", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if(result.status === "error") {
                alert(result.message);
            }

            alert("Успех");
            setLogin('');
            setPasswordFirst('');
            setPasswordSecond('');
        } catch {
            alert("Ошибка");
        } finally {
            setLoading(false);
        }
    }

    function changeComponent() {
        setScreen('login');
    }

    return <>

        <div className="Register">
            <input type="text" 
             value={login}
             onChange={e => setLogin(e.target.value)}
             placeholder="Придумайте логин"
            />
            <input type="password" 
             value={passwordFirst}
             onChange={e => setPasswordFirst(e.target.value)}
             placeholder="Придумайте пароль"
            />
            <input type="password" 
             value={passwordSecond}
             onChange={e => setPasswordSecond(e.target.value)}
             placeholder="Повторите пароль"
            />
            <button type="submit" onClick={handleClick} disabled={loading}>{loading ? "Попытка регистрации..." : "Зарегистрироваться"}</button>
            <p>или</p>
            <button onClick={changeComponent}>Войти</button>
        </div>

    </>
}

export default Register;