import { useState, useEffect } from "react";
import './Chats.css'


function Chats({ openChat }) {

    const[companions, setComponions] = useState([
        {id: 1, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKu9gyKioTsKU645nZ-POLW2ZfrmPPdbuFIAH_14PjViMvHyP1TsLjd2VcFnGahOzJdFLDPVPclEkow-wrnI46DrlMEUV5CYS6lN6FK64r&s=10', login: 'cole1', lastMessage: 'Hello, how are you?'},
        {id: 2, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKu9gyKioTsKU645nZ-POLW2ZfrmPPdbuFIAH_14PjViMvHyP1TsLjd2VcFnGahOzJdFLDPVPclEkow-wrnI46DrlMEUV5CYS6lN6FK64r&s=10', login: 'cole2', lastMessage: 'Hello, how are you?'},
        {id: 3, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKu9gyKioTsKU645nZ-POLW2ZfrmPPdbuFIAH_14PjViMvHyP1TsLjd2VcFnGahOzJdFLDPVPclEkow-wrnI46DrlMEUV5CYS6lN6FK64r&s=10', login: 'cole3', lastMessage: 'Hello, how are you?'},
        {id: 4, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKu9gyKioTsKU645nZ-POLW2ZfrmPPdbuFIAH_14PjViMvHyP1TsLjd2VcFnGahOzJdFLDPVPclEkow-wrnI46DrlMEUV5CYS6lN6FK64r&s=10', login: 'cole', lastMessage: 'Hello, how are you?'}
    ]);

    useEffect(() => {
        fetch('/api/chats/')
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