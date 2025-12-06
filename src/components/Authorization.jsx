function Authorization( {setScreen} ) {

    return <>
        <div className="authorization-block">
            <p>Вы уже зарегистрированы?</p>
            <div className="block">
                <button onClick={() => setScreen("login")}>Да</button>
                <button onClick={() => setScreen("register")}>Нет</button>
            </div>
        </div>
    </>
}

export default Authorization;