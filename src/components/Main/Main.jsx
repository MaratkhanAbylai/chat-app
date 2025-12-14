import { useState } from 'react'
import './Main.css'
import Chats from './contentComponents/Chats/Chats'
import FriendsComponent from './contentComponents/Friends/FriendsComponent';
import Search from './contentComponents/Search/Search';
import ChatWindow from './contentComponents/ChatWindow/ChatWindow';

function Main() {

    const [screen, setScreen] = useState('main');
    const [activeChat, setActiveChat] = useState(false);

    function openChats() {
        setScreen('chats');
    }

    function openChat() {
        setScreen('chat');
        setActiveChat(true);
    }

    function back() {
        setScreen('chats');
        setActiveChat(false);
    }

    function openFriendList() {
        setScreen('friends');
    }

    function openSearch() {
        setScreen('search');
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
                        <li><button onClick={openChats}>Чаты</button></li>
                        <li><button onClick={openFriendList}>Друзья</button></li>
                        <li><button onClick={openSearch}>Поиск</button></li>
                        <li><button className="exit-btn">Выйти</button></li>
                    </ul>
                </div>

            </div>

            <div className="main">
                {screen === "main" && <Chats />}
                {screen === "chats" && <Chats />}
                {screen === "friends" && <FriendsComponent />}
                {screen === "search" && <Search />}
                {screen === "chat" && <ChatWindow />}
            </div>
        </div>
    </>
}

export default Main;