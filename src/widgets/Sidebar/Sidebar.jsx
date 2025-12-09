import "./Sidebar.css";

function Sidebar({ onChats, onFriends, onSearch }) {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Меню</h2>

            <ul className="sidebar-list">
                <li><button onClick={onChats}>Чаты</button></li>
                <li><button onClick={onFriends}>Друзья</button></li>
                <li><button onClick={onSearch}>Поиск</button></li>
            </ul>
        </div>
    );
}

export default Sidebar;