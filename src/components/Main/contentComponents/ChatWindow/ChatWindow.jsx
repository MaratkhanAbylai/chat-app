import { useState, useEffect } from "react"
import './ChatWindow.css'

function ChatWindow({ companion, back }) {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (!companion) return;

        fetch(`/api/messages/${companion.id}`)
        .then(res => {
            if(!res.ok) {
                throw new Error("Ошибка при загрузке сообщений");
            }

            return res.json();
        })
        .then(data => setMessages(data))
        .catch(err => console.error(err));

    }, [companion]);

    async function sendMsg() {
        if(!inputValue.trim()) return;

        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                to: companion.id,
                text: inputValue
            })
        })
        .then(res => res.json())
        .then(savedMessage => {
            setMessages(prev => [...prev, savedMessage]);
            setInputValue('');
        })
        .catch(err => console.error(err));

    }

    if (!companion) return null;

    return <>

        <div className="chat-window">

            <div className="header">
                <button onClick={back}>←</button>
                <img src={companion.avatar} alt="" />
                <p>{companion.login}</p>
            </div>

            <div className="chat-messages">
                <p className="companion-msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quaerat.</p>        
                <p className="my-msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quaerat.</p>
                <p className="companion-msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quaerat.</p>        
                <p className="my-msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quaerat.</p> 
                <p className="companion-msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quaerat.</p>        
                <p className="my-msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quaerat.</p>        
            </div>

            <div className="chat-input">
                <input type="text" 
                 value={inputValue}
                 onChange={e => setInputValue(e.target.value)}
                />
                <button onClick={sendMsg}>Send</button>
            </div>

        </div>

    </>

}

export default ChatWindow;