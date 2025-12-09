import { useState } from "react";
import { v4 as uuid } from "uuid";
import './Chats.css'

function Chats() {

    const[companions, setComponions] = useState([
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSwDsNUtqFc0oB0frWWNFaxlpBAz-LW06w&s", login: "Гарри Поттер", lastMessage: "Ана сабақтан ана лабканы жасадың ба?"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s", login: "Колл Палмер", lastMessage: "Чтм фифа ойнаймыз ба?"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSwDsNUtqFc0oB0frWWNFaxlpBAz-LW06w&s", login: "Гарри Поттер", lastMessage: "Ана сабақтан ана лабканы жасадың ба?"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSwDsNUtqFc0oB0frWWNFaxlpBAz-LW06w&s", login: "Гарри Поттер", lastMessage: "Ана сабақтан ана лабканы жасадың ба?"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSwDsNUtqFc0oB0frWWNFaxlpBAz-LW06w&s", login: "Гарри Поттер", lastMessage: "Ана сабақтан ана лабканы жасадың ба?"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSwDsNUtqFc0oB0frWWNFaxlpBAz-LW06w&s", login: "Гарри Поттер", lastMessage: "Ана сабақтан ана лабканы жасадың ба?"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSwDsNUtqFc0oB0frWWNFaxlpBAz-LW06w&s", login: "Гарри Поттер", lastMessage: "Ана сабақтан ана лабканы жасадың ба?"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSwDsNUtqFc0oB0frWWNFaxlpBAz-LW06w&s", login: "Гарри Поттер", lastMessage: "Ана сабақтан ана лабканы жасадың ба?"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRQOe9JQO3bQetUJsweuxTH_v3pmtp3LVQ&s", login: "Колл Палмер", lastMessage: "Чтм фифа ойнаймыз ба?"},
        {id: uuid(), link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSwDsNUtqFc0oB0frWWNFaxlpBAz-LW06w&s", login: "Гарри Поттер", lastMessage: "Ана сабақтан ана лабканы жасадың ба?"}
    ]);

    return <>

        <div className="chats-container">
            
            <h1>Чаты</h1>

            <div className="companions">
                {companions.map(companion => (
                    <div className="companion-container" key={companion.id}>
                        <img src={companion.link} alt="companion's avatar" />
                        <p className="companion-login">{companion.login}</p>
                        <p className="last-message">{companion.lastMessage.slice(0, 13)}...</p>
                    </div>
                ))}
            </div>

        </div>

    </>

}

export default Chats;