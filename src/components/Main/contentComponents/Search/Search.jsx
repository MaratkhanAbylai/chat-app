import { useState } from "react";
import { v4 as uuid } from "uuid"
import './Search.css'

function Search() {

    const [inputValue, setInputValue] = useState('');
    const [resultUsers, setResultUsers] = useState([
        {id: uuid(), login: "Cole Palmer", link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"}
    ]);

    return  <>

        <div className="searchContainer">

            <input type="text" 
             value={inputValue}
             onChange={e => setInputValue(e.target.value)}
            />

            <div className="result-block">

                {resultUsers.map(user => (
                    <div className="user" key={user.id}>
                        <img src={user.link} alt="Изоброжения пользователя" />
                        <p className='friends-login'>{user.login}</p>
                        <button className='send-request-btn'>Отправить запрос</button>
                        <button className='write-btn'>Написать</button>
                    </div>
                ))}

            </div>

        </div>

    </>

}

export default Search;