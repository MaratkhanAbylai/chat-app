import { useState } from 'react';
import classes from './FriendRequests.module.css';

function FriendRequests() {

    const [requests, setRequests] = useState([
        {id: 1, avatar: '../../../../../pictures/chmo.png', login: 'Darkhan'}
    ]);



    return <>
    
        <div className={classes['requests-container']}>

            <p className={classes['requests-number']}>
                {requests.length} заявок в друзья
            </p>

            <div className="requests-list">
                {requests.map(user => (
                    <div className="request" key={user.id}>
                        <img className={classes.avatar} src={user.avatar || 'default.png'} alt="user's avatar" />
                        <p className="login">{user.login}</p>
                        <div className="btns">
                            <button>Принять</button>
                            <button>Отклонить</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    </>

}

export default FriendRequests;