import { useState, useEffect } from "react";
import './Chats.css'


function Chats({ openChat }) {

    const[companions, setComponions] = useState([]);

    useEffect(() => {
        fetch('link to db')
        .then(res => res.json())
        .then(data => setComponions(data))
        .catch(err => console.error(err));
    }, []);

    return <>

        <div className="chats-container">
            
            <h1>Чаты</h1>

            <div className="companions">
                {companions.map(companion => (
                    <div className="companion-container" key={companion.id} onClick={() => openChat(companion)}>
                        <img src={companion.link} alt="companion's avatar" />
                        <p className="companion-login">{companion.login}</p>
                        <p className="last-message">{companion.lastMessage ? companion.lastMessage.slice(0, 13) + "..." : ""}</p>
                    </div>
                ))}
            </div>

        </div>

    </>

}

export default Chats;