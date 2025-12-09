import { useState } from 'react'
import './Main.css'
import Chats from './contentComponents/Chats/Chats'

function Main() {

    const [screen, setScreen] = useState('main');

    function openChats() {
        setScreen('chats');
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
                        <li><button>Чаты</button></li>
                        <li><button>Друзья</button></li>
                        <li><button>Поиск</button></li>
                    </ul>
                </div>

            </div>

            <div className="main">
                <Chats />
            </div>
        </div>
    </>
}

export default Main;