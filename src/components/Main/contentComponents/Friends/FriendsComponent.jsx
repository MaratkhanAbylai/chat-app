import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import './FriendsComponent.css'

function FriendsComponent() {

    const [friendsList, setFriendsList] = useState([
        {id: 1, login: 'Cole Palmer', link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10'}
    ]);

    useEffect(() => {
        fetch('link to db')
        .then(res => res.json())
        .then(data => setFriendsList(data))
        .catch(err => console.error(err));
    }, []);

    async function deleteFriend(friendId) {
        const response = await fetch()
    }

    return <>
        
        <div className="friends-container">

            <h1>Друзья: {friendsList.length}</h1>

            <div className="friends-list">
                {friendsList.map(friend => (
                    <div className="friend" key={friend.id}>
                        <img src={friend.link} alt="Изоброжения друга" />
                        <p className='friends-login'>{friend.login}</p>
                        <button className='chat-with-friend'>Написать другу</button>
                        <button>Удалить из друзей</button>
                    </div>
                ))}
            </div>

        </div>

    </>

}

export default FriendsComponent;