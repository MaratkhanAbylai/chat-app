import { useState, useEffect } from "react";
import classes from "./ChatWindow.module.css";

function ChatWindow({ companion, back, user }) {
  if (!user || !companion) return null;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const token = user.token;
  const myId = user.id;

  useEffect(() => {
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
        if (!res.ok) throw new Error(data?.message);

        if (!cancelled) setMessages(data.messages || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadMessages();
    return () => (cancelled = true);
  }, [companion.id, token]);

  async function sendMsg() {
    if (!inputValue.trim()) return;

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
      if (!res.ok) throw new Error(data?.message);

      setMessages(prev => [
        ...prev,
        {
          id: data.message_id,
          sender_id: myId,
          body: inputValue,
          created_at: new Date().toISOString(),
        },
      ]);

      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={classes["chat-window"]}>
      <div className={classes.header}>
        <button onClick={back}>←</button>
        <img src={companion.avatar} alt="" />
        <p>{companion.login}</p>
      </div>

      <div className={classes["chat-messages"]}>
        {messages.map(m => (
          <p
            key={m.id}
            className={
              m.sender_id === myId
                ? classes["my-msg"]
                : classes["companion-msg"]
            }
          >
            {m.body}
          </p>
        ))}
      </div>

      <div className={classes["chat-input"]}>
        <input
          value={inputValue}
          className={classes.input}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMsg()}
          placeholder="Введите сообщение"
        />
        <button className={classes['send-btn']} onClick={sendMsg}>
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
