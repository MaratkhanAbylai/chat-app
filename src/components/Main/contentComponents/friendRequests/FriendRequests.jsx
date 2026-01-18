import { useState, useEffect } from 'react';
import classes from './FriendRequests.module.css';

function FriendRequests() {

    const [requests, setRequests] = useState([
        {id: 1, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'},
        {id: 2, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'},
        {id: 3, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'},
        {id: 4, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'},
        {id: 5, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'},
        {id: 6, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'},
        {id: 7, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzUgSb2fX-EQP7_OpZ7RMZ1SAZH25L7-DHRrqcBhPrmcISicfKdI7BA00CZ7T-V5h1MPo4uj5UnuYZ_ZKsHqbtGQR51DfGBF2qS7uiA&s=10', login: 'Cold'}
    ]);
    const [renderLoading, setRenderLoading] = useState(false);

    const [acceptLoading, setAcceptLoading] = useState(null);

    const [rejectLoading, setRejectLoading] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {

        if(!token) return;

        setRenderLoading(true);

        fetch('/api/requests/', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            
            if(!res.ok) throw new Error("Ошибка при загрузке запросов");
            return res.json();

        })
        .then(data => setRequests(data))
        .catch(err => {
            console.error(err);
            alert(err.message);
        })
        .finally(() => setRenderLoading(false));

    }, [token]);

    async function acceptFriend(id) {

        try {

            setAcceptLoading(id);

            const response = await fetch('/api/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    to: id  // Id пользователя заявку которого приняли
                })
            });

            if(!response.ok) throw new Error('Произошла ошибка при принятие запроса');

            setRequests(prev => prev.filter(request => request.id !== id));

        } catch(err) {
            console.error(err);
            alert(err.message);
        } finally {
            setAcceptLoading(prev => prev === id ? null : prev);
        }

    }

    async function rejectRequest(id) {
        
        try {

            setRejectLoading(id);

            const response = await fetch('/api/rejected/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    to: id  // Id пользователя запрос которого был отклонен
                })
            });

            if(!response.ok) throw new Error('Ошибка при отклонений запроса');

            setRequests(prev => prev.filter(request => request.id !== id));

        } catch(err) {
            console.error(err);
            alert(err.message);
        } finally {
            setRejectLoading(prev => prev === id ? null : prev);
        }

    }

    return <>
    
        <div className={classes['requests-container']}>

            {renderLoading && 'Загрузка...'}

            {!renderLoading && <p className={classes['requests-number']}>
                Заявок: {requests.length}
            </p>}

            <div className={classes['requests-list']}>
                {requests.map(user => (
                    <div className="request" key={user.id}>
                        <img className={classes.avatar} src={user.avatar || 'default.png'} alt="user's avatar" />
                        <p className={classes.login}>{user.login}</p>
                        <div className={classes.btns}>
                            <button onClick={() => acceptFriend(user.id)}>{acceptLoading === user.id ? 'Принятие запроса...' : 'Принять запрос'}</button>
                            <button onClick={() => rejectRequest(user.id)}>{rejectLoading === user.id ? 'Отклонение...' : 'Отклонить запрос'}</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    </>

}

export default FriendRequests;