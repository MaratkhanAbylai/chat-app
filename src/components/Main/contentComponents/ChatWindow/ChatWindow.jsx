import { useState, useEffect } from "react";
import classes from "./ChatWindow.module.css";

function ChatWindow({ companion, back }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!companion || !token) return;

    let cancelled = false;

    async function loadMessages() {
      try {
        const res = await fetch(
          `http://localhost:8000/api/chats/messages.php?conversation_id=${companion.id}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Ошибка при загрузке сообщений");

        if (!cancelled) setMessages(data.messages || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [companion, token]);

  async function sendMsg() {
    if (!inputValue.trim() || !companion || !token) return;

    try {
      const res = await fetch("http://localhost:8000/api/chats/send.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          conversation_id: companion.id,
          body: inputValue,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Ошибка отправки");

      // сервер должен вернуть сохранённое сообщение (лучше так)
      // если вернул только message_id — сделаем fallback
      const saved = data.message ?? {
        id: data.message_id,
        sender_id: data.sender_id ?? null,
        body: inputValue,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, saved]);
      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  }

  if (!companion) return null;

  return (
    <div className={classes["chat-window"]}>
      <div className={classes.header}>
        <button className={classes["back-btn"]} onClick={back}>
          ←
        </button>
        <img src={companion.avatar} alt="" />
        <p>{companion.login}</p>
      </div>

      <div className={classes["chat-messages"]}>
        {messages.map((m) => (
          <p
            key={m.id}
            className={
              m.sender_id === companion.peerId
                ? classes["companion-msg"]
                : classes["my-msg"]
            }
          >
            {m.body}
          </p>
        ))}
      </div>

      <div className={classes["chat-input"]}>
        <input
          type="text"
          className={classes.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите сообщение"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMsg();
          }}
        />
        <button className={classes["send-btn"]} onClick={sendMsg}>
          <img
            src="../../../../../pictures/icons/send-msg-icon.png"
            alt="send-icon"
            className={classes["send-icon"]}
          />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
