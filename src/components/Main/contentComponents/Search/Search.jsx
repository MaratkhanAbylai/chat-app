import { useEffect, useState } from "react";
import classes from './Search.module.css';

function Search({ user }) {

    const [inputValue, setInputValue] = useState('');
    const [resultUsers, setResultUsers] = useState([
        {id: 2, login: "Cole Palmer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"},
        {id: 3, login: "Cole Palmer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"},
        {id: 4, login: "Cole Palmer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"},
        {id: 5, login: "Cole Palmer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"},
        {id: 6, login: "Cole Palmer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"},
        {id: 7, login: "Cole Palmer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"},
        {id: 8, login: "Cole Palmer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"}
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    const [requestLoadingId, setRequestLoadingId] = useState(null);
    const [requestedIds, setRequestedIds] = useState([]);
    useEffect(() => {
  if (!inputValue.trim()) {
    setResultUsers([]);
    setLoading(false);
    return;
  }

  setLoading(true);
  setError(null);

  const timeout = setTimeout(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/search.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          query: inputValue
        })
      });

      if (!res.ok) throw new Error("Ошибка при поиске");

      const data = await res.json();
      setResultUsers(data.users);

    } catch (err) {
      setError(err.message);
      setResultUsers([]);
    } finally {
      setLoading(false);
    }
  }, 400);

  return () => clearTimeout(timeout);
}, [inputValue, token]);

    async function sendRequest(id) {

        try {

            setRequestLoadingId(id);

            const response = await fetch('http://localhost:8000/api/friends/request.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    to: id,
                    from: user.id // По идее фромды алып тастасакта болады если бэк токеннан айдиды алуга шамасы жетсе)
                })
            });

            const res = await response.json();

            if(!response.ok) throw new Error('Произошла ошибка при отправке запроса');

            setRequestedIds(prev => [...prev, id]);

        } catch(err) {
            console.error(err);
        } finally {
            setRequestLoadingId(prev => (prev === id ? null : prev));
        }

    }

    return <>
        <div className={classes['search-container']}>

            <div className={classes["input-block"]}>
                <input type="text" className={classes.input}
                 value={inputValue}
                 onChange={e => setInputValue(e.target.value)}
                 placeholder="Найти пользователя"
                />
            </div>

            <div className={classes["results-block"]}>

                {loading && <p>Поиск...</p>}
                {!loading && resultUsers.length === 0 && inputValue && !error &&
                 <p>Пользователь не найден</p>
                }
                {error && inputValue.trim() !== '' &&
                 <p>{error}</p>
                }

                {resultUsers.map(u => {
                    if(u.id === user.id) return null;

                    return (
                        <div key={u.id} className={classes["result-user"]}>
                            <img src={u.avatar ? u.avatar : 'default.png'} alt="user's avatar" className={classes.avatar} />
                            <p className={classes.login}>{u.login}</p>
                            {requestedIds.includes(u.id) ? 
                                (<span className={classes['sended-request']}>Запрос отправлен</span>)
                                :
                                (<button className={classes['send-request']} disabled={requestLoadingId === u.id} onClick={() => sendRequest(u.id)}>
                                    {requestLoadingId === u.id ?
                                        "Отрпавка запроса..."
                                        :
                                        "Отправить запрос"
                                    }
                                </button>)
                            }
                        </div>
                    )
                })}

            </div>
        </div>
    </>
}

export default Search;
