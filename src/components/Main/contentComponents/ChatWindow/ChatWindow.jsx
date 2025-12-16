import { useState, useEffect } from "react"
import './ChatWindow.css'

function ChatWindow({ companion, back }) {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if(!companion) return;

        fetch(`link`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error(err));
    }, []);

    if (!companion) return null;

    return <>

        <div className="chat-window">

            <div className="header">
                <button onClick={back}>←</button>
                <img src={companion.link} alt="" />
                <p>{companion.login}</p>
            </div>

            <div className="chat-messages">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa nesciunt recusandae vel soluta dolores maiores. Facere corrupti doloremque labore praesentium dolorem nulla, eveniet numquam architecto iste repellendus recusandae vero porro.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa nesciunt recusandae vel soluta dolores maiores. Facere corrupti doloremque labore praesentium dolorem nulla, eveniet numquam architecto iste repellendus recusandae vero porro.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa nesciunt recusandae vel soluta dolores maiores. Facere corrupti doloremque labore praesentium dolorem nulla, eveniet numquam architecto iste repellendus recusandae vero porro.</p>
            </div>

            <div className="chat-input">
                <input type="text" 
                 value={inputValue}
                 onChange={e => setInputValue(e.target.value)}
                />
                <button>Send</button>
            </div>

        </div>

    </>

}

export default ChatWindow;