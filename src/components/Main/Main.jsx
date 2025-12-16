import { useState } from 'react'
import './Main.css'
import Chats from './contentComponents/Chats/Chats'
import FriendsComponent from './contentComponents/Friends/FriendsComponent';
import Search from './contentComponents/Search/Search';
import ChatWindow from './contentComponents/ChatWindow/ChatWindow';

function Main() {

    const [screen, setScreen] = useState('chats');
    const [activeChat, setActiveChat] = useState(null);

    function openChat(companion) {
        setActiveChat(companion);
        setScreen('chat');
    }

    function backToChats() {
        setActiveChat(null);
        setScreen('chats');
    }

    return <>
        <div className="container">
            <div className="sidebar">
                
                <div className="sidebar-user">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMwlOlY8FxygArpLxfTCoBzqfxDhaIco3ruA&s" alt="avatar" className='logo' />
                    <p className='login'>User's Login</p>
                </div>

                <div className="sidebar-menu">
                    <ul>
                        <li><button onClick={() => setScreen('chats')}>Чаты</button></li>
                        <li><button onClick={() => setScreen('friends')}>Друзья</button></li>
                        <li><button onClick={() => setScreen('search')}>Поиск</button></li>
                        <li><button className="exit-btn">Выйти</button></li>
                    </ul>
                </div>

            </div>

            <div className="main">
                {screen === "chats" && <Chats openChat={openChat} />}
                {screen === "friends" && <FriendsComponent />}
                {screen === "search" && <Search />}
                {screen === "chat" && (<ChatWindow companion={activeChat} back={backToChats} />)}
            </div>
        </div>
    </>
}

export default Main;