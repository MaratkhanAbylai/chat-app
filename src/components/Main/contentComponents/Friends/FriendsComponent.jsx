import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import './FriendsComponent.css'

function FriendsComponent() {

    const [friendsList, setFriendsList] = useState([
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSwDsNUtqFc0oB0frWWNFaxlpBAz-LW06w&s", login: "Гарри Поттер"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s", login: "Коул Палмер"}
    ]);

    return <>
        
        <div className="friends-container">

            <h1>Друзья: {friendsList.length}</h1>

            <div className="friends-list">
                {friendsList.map(friend => (
                    <div className="friend" key={friend.id}>
                        <img src={friend.link} alt="Изоброжения друга" />
                        <p className='friends-login'>{friend.login}</p>
                        <button className='chat-with-friend'>Написать другу</button>
                    </div>
                ))}
            </div>

        </div>

    </>

}

export default FriendsComponent;