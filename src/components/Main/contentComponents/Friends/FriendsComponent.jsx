import { useState, useEffect } from 'react';
import './FriendsComponent.css';

function FriendsComponent({ openChat }) {

    const [friendsList, setFriendsList] = useState([
        {id: 1, login: 'Cole Palmer', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10'},
        {id: 2, login: 'Zhumabek', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10'},
        {id: 3, login: 'Darkhan', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10'},
        {id: 5, login: 'Grandpa', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10'},
        {id: 6, login: 'Akzhan', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10'}
    ]);
    const [loadingId, setLoadingId] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('/api/friends', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(data => setFriendsList(data))
        .catch(err => console.error(err));
    }, [token]);

    async function deleteFriend(id) {
        
        try {

            setLoadingId(id);

            const response = await fetch('/api/friends/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    friendId: id
                })
            });

            const res = await response.json();

            if(!response.ok) {
                throw new Error(res.message || "Ошибка при удалении друга");
            }

            setFriendsList(friendsList => friendsList.filter(f => f.id !== id));

        } catch(err) {
            console.error(err.message);
        } finally {
            setLoadingId(prev => (prev === id ? null : prev));
        }

    }

    return <>
        
        <div className="friends-container">

            <h1>Друзья: {friendsList.length}</h1>

            <div className="friends-list">
                {friendsList.map(friend => (
                    <div className="friend" key={friend.id}>
                        <img src={friend.avatar} alt="Изоброжения друга" />
                        <p className='friends-login'>{friend.login}</p>
                        <button className='chat-with-friend' onClick={() => openChat(friend)}>Написать другу</button>
                        <button disabled={loadingId === friend.id} onClick={() => deleteFriend(friend.id)}>{loadingId === friend.id ? 'Удаление...' : 'Удалить из друзей'}</button>
                    </div>
                ))}
            </div>

        </div>

    </>

}

export default FriendsComponent;