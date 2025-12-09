import "./Search.css";
import { useState } from "react";
import { Input, Button } from "@/shared/ui";

function Search() {
    const [query, setQuery] = useState("");

    function searchUser() {
        alert("Поиск: " + query);
    }

    return (
        <div className="search">
            <h2>Поиск пользователей</h2>

            <Input
                placeholder="Введите имя..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            <Button onClick={searchUser}>Искать</Button>
        </div>
    );
}

export default Search;