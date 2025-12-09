import { useState } from 'react'
import {styles} from './Chats.css'
import { v4 as uuid } from 'uuid';

function Chats() {

    const [companions, setCompanions] = useState([
        {id: uuid() ,link: "https://sm.ign.com/ign_me/cover/h/harry-pott/harry-potter-the-series_brj2.jpg", login: "Гарри Поттер", lastMessage: "Ертең пс ойнайық как положено"},
        {id: uuid(), link: "https://citaty.info/files/portraits/shon-merfi.jpg", login: "Шон Мёрфи", lastMessage: "Чтм оқу қалай болып жатыр, жұмыс таптың ба?"}
    ]);

    return <>
        
        <div className="Chats-container">
            <h1>Чаты</h1>
            <div className="chats">

                {companions.map(companion => (
                    <div className="companion" key={companion.id}>
                        <img src={companion.link} className='logo-companion' />
                        <p className="companionLogin">{companion.lastMessage.slice(0, 10)}...</p>
                        <p className='lastMessage'>{companion.login}</p>
                    </div>
                ))}

            </div>
        </div>
        
    </>

}

export default Chats;