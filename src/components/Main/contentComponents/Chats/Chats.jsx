import { useState, useEffect } from "react";
import './Chats.css'


function Chats({ openChat }) {

    const[companions, setComponions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/chats/list2.php', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(res => res.json())
        .then(data => {
            // бэк возвращает { status, chats }
            const chats = data.chats.map(chat => ({
                id: chat.conversation_id,
                avatar: chat.peer_avatar,
                login: chat.peer_login,
                lastMessage: chat.last_message
            }));
            setComponions(chats);
        })
        .catch(err => console.error(err));
}, []);

    return <>

        <div className="chats-container">
            
            <h1>Чаты</h1>

            <div className="companions">
                {companions.map(companion => (
                    <div className="companion-container" key={companion.id} onClick={() => openChat(companion)}>
                        <img className="avatar" src={companion.avatar} alt="companion's avatar" />
                        <p className="companion-login">{companion.login}</p>
                        <p className="last-message">{companion.lastMessage ? companion.lastMessage.slice(0, 13) + "..." : ""}</p>
                    </div>
                ))}
            </div>

        </div>

    </>

}

export default Chats;