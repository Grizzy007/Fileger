import React, {useEffect, useState} from 'react';
import Backendless from "backendless";
import set = Backendless.LocalCache.set;

const Friends = () => {

    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp('88F13D1C-FC0C-2D37-FF91-A541959F4400', '4D32BF48-EE07-4934-B468-177BA8E02A23');

    const [users, setUsers] = useState<any>()
    const [user, setUser] = useState<any>()
    const [findUser, setFindUser] = useState<any>()
    const [id, setId] = useState("")

    useEffect(() => {
        Backendless.UserService.getCurrentUser().then(response => {
            setUser(response)
        })
        Backendless.Data.of("Users").find().then(response => setUsers(response))
    }, [])

    //console.log(user)
    //console.log(users)
    console.log(findUser)
    //console.log(id)

    const findById = () => {
        Backendless.Data.of("Users").findById({objectId: id}).then((response) => {
            setFindUser(response)
        })
    }

    return (
        <div style={{margin: "10px"}}>
            <div style={{marginBottom: "10px"}}>
                Друзья
            </div>
            {user?.friends.map((friend: { id: string, accept: boolean }) =>
                <div style={{padding: "10px", border: "1px solid black", marginBottom: "10px"}} key={friend.id}>
                    ID друга
                    {" " + friend.id}
                    <div>
                        Статус заявки
                        <div>
                            {friend.accept ? "В друзьях" : "Заявка отправлена"}
                        </div>
                    </div>
                    <div>
                        <button>Удалить</button>
                    </div>
                </div>
            )}
            <div>
                Найти / Добавить друга
                <input placeholder="Введите ID друга" value={id} onChange={(e) => setId(e.target.value)}/>
                <button onClick={findById}>Найти</button>
                <div>
                    <div>Имя {findUser?.name} </div>
                    <div>Почта {findUser?.email} </div>
                    <div>Гендер {findUser?.gender} </div>
                    <button>Добавить в друзья </button>
                </div>
            </div>
        </div>
    );
};

export default Friends;