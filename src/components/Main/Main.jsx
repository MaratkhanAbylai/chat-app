import { useRef, useEffect, useState } from "react";
import styles from "./Main.module.css";
import Chats from "./contentComponents/Chats/Chats";
import FriendsComponent from "./contentComponents/Friends/FriendsComponent";
import FriendRequests from "./contentComponents/friendRequests/FriendRequests";
import Search from "./contentComponents/Search/Search";
import ChatWindow from "./contentComponents/ChatWindow/ChatWindow";

function Main({ user, setUser, goToLogin }) {
  if (!user) return null;

  const [screen, setScreen] = useState("chats");
  const [activeChat, setActiveChat] = useState(null);
  const [prevScreen, setPrevScreen] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (user?.avatar?.startsWith("blob:")) {
        URL.revokeObjectURL(user.avatar);
      }
    };
  }, [user?.avatar]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Можно загрузить только изображение");
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert("Размер изображения не должен превышать 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/pictures/ava.jpg", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user.token,
        },
        body: formData,
      });

      const data = await response.json();

      setUser((prev) => ({
        ...prev,
        avatar: data.avatar,
      }));
    } catch (err) {
      console.error(err);
      alert("Не удалось загрузить аватар");
    }

    e.target.value = null;
  };

  function openChat(companion) {
    setPrevScreen(screen);
    setActiveChat(companion);
    setScreen("chat");
    setSidebarOpen(false);
  }

  function backToChats() {
    setActiveChat(null);
    setScreen(prevScreen || "chats");
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    goToLogin();
  }

  function go(screenName) {
    setScreen(screenName);
    setSidebarOpen(false);
  }

  return (
    <div className={styles.container}>
      {/* BURGER */}
      <button className={styles.burger} onClick={() => setSidebarOpen(true)}>
        ☰
      </button>

      {/* SIDEBAR */}
      <aside
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.open : ""
        }`}
      >
        <div className={styles["sidebar-user"]}>
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="avatar"
            className={styles.logo}
            onClick={handleImageClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <p className={styles.login}>{user.login}</p>
        </div>

        <div className={styles["sidebar-menu"]}>
          <ul>
            <li><button onClick={() => go("chats")}>Чаты</button></li>
            <li><button onClick={() => go("friends")}>Друзья</button></li>
            <li><button onClick={() => go("requests")}>Заявки</button></li>
            <li><button onClick={() => go("search")}>Поиск</button></li>
            <li>
              <button className={styles["exit-btn"]} onClick={logout}>
                Выйти
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <main className={styles.main}>
        {screen === "chats" && <Chats openChat={openChat} />}
        {screen === "friends" && <FriendsComponent openChat={openChat} />}
        {screen === "requests" && <FriendRequests />}
        {screen === "search" && <Search user={user} />}
        {screen === "chat" && (
          <ChatWindow companion={activeChat} back={backToChats} ser={user} />
        )}
      </main>
    </div>
  );
}

export default Main;
