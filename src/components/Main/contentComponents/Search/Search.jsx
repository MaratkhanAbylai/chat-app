import { useEffect, useState } from "react";
import classes from './Search.module.css';

function Search({ user }) {

    const [inputValue, setInputValue] = useState('');
    const [resultUsers, setResultUsers] = useState([
        {id: 1, login: "Cole Palmer", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s"}
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    const [requestLoadingId, setRequestLoadingId] = useState(null);
    const [requestedIds, setRequestedIds] = useState([]);
    useEffect(() => {

        if(!inputValue.trim()) {
            setResultUsers([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const timeout = setTimeout(async () => {
            try {

                const res = await fetch(`/api/search?login=${encodeURIComponent(inputValue)}`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });

                if(!res.ok) throw new Error("Ошибка при поиске");

                const data = await res.json();
                setResultUsers(data);

            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timeout);

    }, [inputValue, token]);

    async function sendRequest(id) {

        try {

            setRequestLoadingId(id);

            const response = await fetch('/api', {
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

    return (
        <div className="searchContainer">

            <div className="input-block">
                <input type="text" 
                 value={inputValue}
                 onChange={e => setInputValue(e.target.value)}
                />
            </div>

            <div className="results-block">

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
                        <div key={u.id} className="resultUser">
                            <img src={u.avatar ? u.avatar : 'default.png'} alt="user's avatar" />
                            <p>{u.login}</p>
                            {requestedIds.includes(u.id) ? 
                                (<span>Запрос отправлен</span>)
                                :
                                (<button disabled={requestLoadingId === u.id} onClick={() => sendRequest(u.id)}>
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
    );
}

export default Search;
