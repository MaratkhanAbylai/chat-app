import { useEffect, useState } from "react";
import "./Search.css";

function Search({ token }) {
    const [inputValue, setInputValue] = useState("");
    const [resultUsers, setResultUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!inputValue.trim()) {
            setResultUsers([]);
            return;
        }

        const controller = new AbortController();

        async function searchUsers() {
            try {
                setLoading(true);

                const response = await fetch(
                    "http://localhost:8000/api/search.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                        body: JSON.stringify({
                            query: inputValue,
                        }),
                        signal: controller.signal,
                    }
                );

                const res = await response.json();

                if (res.status === "success") {
                    setResultUsers(res.users);
                } else {
                    setResultUsers([]);
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        }

        // ⏱ небольшой debounce
        const timeout = setTimeout(searchUsers, 300);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [inputValue, token]);

    return (
        <div className="searchContainer">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Поиск по логину"
            />

            <div className="result-block">
                {loading && <p>Поиск...</p>}

                {!loading &&
                    resultUsers.map((user) => (
                        <div className="user" key={user.id}>
                            <img
                                src={user.avatar || "/default-avatar.png"}
                                alt="Аватар"
                            />
                            <p className="friends-login">{user.login}</p>
                            <button className="send-request-btn">
                                Отправить запрос
                            </button>
                        </div>
                    ))}

                {!loading && resultUsers.length === 0 && inputValue && (
                    <p>Ничего не найдено</p>
                )}
            </div>
        </div>
    );
}

export default Search;
