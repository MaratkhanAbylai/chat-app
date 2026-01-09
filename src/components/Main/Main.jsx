import { useState } from "react";
import styles from "./Main.module.css";
import Chats from "./contentComponents/Chats/Chats";
import FriendsComponent from "./contentComponents/Friends/FriendsComponent";
import Search from "./contentComponents/Search/Search";
import ChatWindow from "./contentComponents/ChatWindow/ChatWindow";

function Main({ user, setUser, goToLogin }) {
  if (!user) return null;

  const [screen, setScreen] = useState("chats");
  const [activeChat, setActiveChat] = useState(null);
  const [prevScreen, setPrevScreen] = useState(null);

  function openChat(companion) {
    setPrevScreen(screen);
    setActiveChat(companion);
    setScreen("chat");
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

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles["sidebar-user"]}>
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="avatar"
            className={styles.logo}
          />
          <p className={styles.login}>{user.login}</p>
        </div>  

        <div className={styles["sidebar-menu"]}>
          <ul>
            <li>
              <button onClick={() => setScreen("chats")}>Чаты</button>
            </li>
            <li>
              <button onClick={() => setScreen("friends")}>Друзья</button>
            </li>
            <li>
              <button onClick={() => setScreen("search")}>Поиск</button>
            </li>
            <li>
              <button className={styles["exit-btn"]} onClick={logout}>
                Выйти
              </button>
            </li>
          </ul>
        </div>
      </div>

      <main className={styles.main}>
        {screen === "chats" && <Chats openChat={openChat} />}
        {screen === "friends" && <FriendsComponent openChat={openChat} />}
        {screen === "search" && <Search user={user} />}
        {screen === "chat" && (
          <ChatWindow companion={activeChat} back={backToChats} />
        )}
      </main>
    </div>
  );
}

export default Main;
