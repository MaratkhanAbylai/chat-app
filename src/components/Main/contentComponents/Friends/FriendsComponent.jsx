import { useState, useEffect } from "react";
import classes from "./FriendsComponent.module.css";

function FriendsComponent({ openChat }) {
  const [friendsList, setFriendsList] = useState([
    {id: 1, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'},
    {id: 2, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'},
    {id: 3, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'},
    {id: 3, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Mara'},
    {id: 3, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'}
  ]);
  const [searchList, setSearchList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [loadingId, setLoadingId] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ===== ЗАГРУЗКА ВСЕХ ДРУЗЕЙ ===== */
  async function fetchFriends() {
    try {
      const response = await fetch("/api/friends", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();
      setFriendsList(data);
    } catch (err) {
      console.error(err);
    }
  }

  /* ===== ПОИСК ===== */
  async function searchFriends(value, signal) {
    if (!value || value.trim().length < 2) {
      setSearchList([]);
      return;
    }

    try {
      setSearchLoading(true);

      const response = await fetch("/api/friends/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ login: value }),
        signal,
      });

      const res = await response.json();

      if (!response.ok || res.status === "error") {
        throw new Error(res.message || "Ошибка поиска");
      }

      setSearchList(res);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    } finally {
      setSearchLoading(false);
    }
  }

  /* ===== ЭФФЕКТ ПОИСКА + DEBOUNCE ===== */
  useEffect(() => {
    const controller = new AbortController();

    // если поиск очищен
    if (!searchValue) {
      setSearchList([]);

      // загружаем друзей только один раз
      if (friendsList.length === 0) {
        fetchFriends();
      }

      return;
    }

    const timeout = setTimeout(() => {
      searchFriends(searchValue, controller.signal);
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [searchValue]);

  /* ===== УДАЛЕНИЕ ДРУГА ===== */
  async function deleteFriend(id) {
    try {
      setLoadingId(id);

      const response = await fetch("/api/friends/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ friendId: id }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Ошибка при удалении");
      }

      setFriendsList((prev) => prev.filter((f) => f.id !== id));
      setSearchList((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  }

  const listToRender =
    searchValue.length > 0 ? searchList : friendsList;

  return (
    <div className={classes["friends-container"]}>
      <div className={classes["container-search"]}>
        <h1 className={classes.counter}>
          Друзья: {friendsList.length}
        </h1>

        <input
          type="text" className={classes.input}
          placeholder="Поиск друзей..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {searchLoading && <p>Поиск друзей...</p>}

      {!searchLoading && listToRender.length === 0 && (
        <p>Ничего не найдено</p>
      )}

      {!searchLoading && listToRender.length > 0 && (
        <div className={classes["friends-list"]}>
          {listToRender.map((friend) => (
            <div className={classes.friend} key={friend.id}>
              <img
                className={classes.avatar}
                src={friend.avatar}
                alt="Изображение друга"
              />

              <p className={classes["friends-login"]}>
                {friend.login}
              </p>

              <button
                className={classes["chat-with-friend"]}
                onClick={() => openChat(friend)}
              >
                Написать другу
              </button>

              <button
                className={classes["del-btn"]}
                disabled={loadingId === friend.id}
                onClick={() => deleteFriend(friend.id)}
              >
                {loadingId === friend.id
                  ? "Удаление..."
                  : "Удалить из друзей"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendsComponent;
