import { useState } from "react";
import { v4 as uuid } from "uuid"
import './Search.css'

function Search() {

    const [inputValue, setInputValue] = useState('');
    const [resultUsers, setResultUsers] = useState([
        {id: uuid(), login: "Cole Palmer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"}
    ]);

    async function search() {
        if(!inputValue.trim()) return;

        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {'Content-type' : 'application/json'},
            body: {username: inputValue}
        });

        const res = await response.json();

    }

    return  <>

        <div className="searchContainer">

            <div className="input-block">
                <input type="text" 
                 value={inputValue}
                 onChange={e => setInputValue(e.target.value)}
                />

                <button>Поиск</button>
            </div>

            <div className="result-block">

                {resultUsers.map(user => (
                    <div className="user" key={user.id}>
                        <img src={user.avatar} alt="Изоброжения пользователя" />
                        <p className='friends-login'>{user.login}</p>
                        <button className='send-request-btn'>Отправить запрос</button>
                    </div>
                ))}

            </div>

        </div>

    </>

}

export default Search;