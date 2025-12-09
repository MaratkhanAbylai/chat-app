import { useState } from "react";
import "./MainPage.css";

import Sidebar from "@/widgets/Sidebar";
import Chats from "@/features/Chats";
import Friends from "@/features/Friends";
import Search from "@/features/Search";

function MainPage() {
    const [screen, setScreen] = useState("chats");

    return (
        <div className="main-layout">
            <Sidebar
                onChats={() => setScreen("chats")}
                onFriends={() => setScreen("friends")}
                onSearch={() => setScreen("search")}
            />

            <div className="main-content">
                {screen === "chats" && <Chats />}
                {screen === "friends" && <Friends />}
                {screen === "search" && <Search />}
            </div>
        </div>
    );
}

export default MainPage;