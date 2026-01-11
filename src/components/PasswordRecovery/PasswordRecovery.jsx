import { useState, useEffect } from "react";

function PasswordRecovery({ setScreen }) {

    const [login, setLogin] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [passLoading, setPassLoading] = useState(false);
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    useEffect(() => {

        const check = sessionStorage.getItem('verified');

        if(!check) return;

        setVerified(true);

    }, []);

    async function verification() {

        if(!login || !code) {
            alert('Все поля должны быть заполнены');
            return;
        }

        if(login.length < 2 || code.length < 2) {
            alert('Логин и кодовое слово не могут быть меньше 2 символов');
            return;
        }

        for(let i = 0; i < code.length; i++) {
            if(code[i] === ' ') {
                alert('Кодовое слово не может содержать пробелы');
                return;
            }
        }

        try {

            setLoading(true);

            const response = await fetch('/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    code: code
                })
            });
        
            const res = await response.json();

            if(!response.ok || res.status == 'error') {
                alert(res.message || 'Проверка не пройдена');
                return;
            }

            setVerified(true);
            sessionStorage.setItem('verified', 'verified');
            sessionStorage.setItem('login', login);

        } catch(err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }

    }

    async function changePassword() {

        const timeLogin = sessionStorage.getItem('login');
        let finallyLogin = login;

        if(newPassword1.length < 8) {
            alert('Пароль должен состоять минимум из 8 символов');
            return;
        }

        if(newPassword1 !== newPassword2) {
            alert('Пароли должны совпадать');
            return;
        }

        if(login.length === 0 && timeLogin) {
            finallyLogin = timeLogin;
        }

        if(!finallyLogin) {
            alert('Произошла ошибка при загрузке логина');
            return;
        }

        try {

            setPassLoading(true);

            const response = await fetch('<localhost:8000/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: finallyLogin,
                    newPassword: newPassword1
                })
            });

            if(!response.ok) throw new Error('Произошла ошибка при смене пароля');

            alert('Пароль успешно изменен!');
            sessionStorage.removeItem('verified');
            sessionStorage.removeItem('login');
            setVerified(false);
            setScreen('login');

        } catch(err) {
            console.error(err);
            alert(err.message);
        } finally {
            setPassLoading(false);
        }

    }

    function backForPass() {
        sessionStorage.removeItem('verified');
        sessionStorage.removeItem('login');
        setCode('');
        setVerified(false);
    }

    return <>

        {verified ?
            <div className="new-password">
                <input type="password" 
                 value={newPassword1}
                 onChange={e => setNewPassword1(e.target.value)}
                 placeholder="Введите новый пароль"
                />
                <input type="password" 
                 value={newPassword2}
                 onChange={e => setNewPassword2(e.target.value)}
                 placeholder="Повторите новый пароль"
                />
                <button disabled={passLoading} onClick={changePassword}>{passLoading ? 'Меняем пароль...' : 'Изменить пароль'}</button>
                <button disabled={passLoading} onClick={backForPass}>Назад</button>
            </div>
            :
            <div className="container">
                <input type="text" 
                 value={login}
                 onChange={e => setLogin(e.target.value)}
                 placeholder="Введите ваш логин"
                />
                <input type="text" 
                 value={code}
                 onChange={e => setCode(e.target.value)}
                 placeholder="Введите кодовое слово"
                />
                <button disabled={loading} onClick={verification}>{loading ? 'Проверка...' : 'Продолжить'}</button>
                <button disabled={loading} onClick={() => setScreen('login')}>Назад</button>
            </div>
        }

    </>

}

export default PasswordRecovery;