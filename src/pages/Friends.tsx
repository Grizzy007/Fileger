import React, { useEffect, useState } from 'react';
import Backendless from "backendless";
import set = Backendless.LocalCache.set;

const Friends = () => {

  Backendless.serverURL = "https://api.backendless.com";
  Backendless.initApp('88F13D1C-FC0C-2D37-FF91-A541959F4400', '4D32BF48-EE07-4934-B468-177BA8E02A23');

  const [users, setUsers] = useState<any>()
  const [user, setUser] = useState<any>()
  const [friends, setFriends] = useState<any>([])
  const [findUser, setFindUser] = useState<any>()
  const [id, setId] = useState("")

  useEffect(() => {
    Backendless.UserService.getCurrentUser().then(response => {
      console.log('getCurrentUser', response);
      setUser(response)
    })
    Backendless.Data.of("Users").find().then(response => {
      console.log('find', response);
      setUsers(response)
    })
  }, [])

  useEffect(() => {
    if (user?.friends) {
      setFriends(user?.friends);
    }
  }, [user])

  const findById = () => {
    Backendless.Data.of("Users").findById({ objectId: id }).then((response) => {
      setFindUser(response)
    })
  }

  const addNewFriend = () => {
    const userObject = Backendless.UserService.getCurrentUser();
    if (userObject) {
      const newUser = { ...userObject, friends: [] }
      newUser.friends = newUser.friends.concat(findUser);
      Backendless.UserService.update(userObject)
        .then(updatedUser => {
          console.log('User updated successfully:', updatedUser);
        })
        .catch(error => {
          console.log('Error updating user:', error);
        });
    } else {
      console.log('No user is currently logged in');
    }
  }

  const deleteFriend = (id: string) => {
    const userObject = Backendless.UserService.getCurrentUser();
    if (userObject) {
      const newUser = { ...userObject, friends: [] }
      newUser.friends = newUser.friends.filter((friend: { objectId: string }) => friend.objectId !== id);
      Backendless.UserService.update(userObject)
        .then(updatedUser => {
          console.log('User updated successfully:', updatedUser);
        })
        .catch(error => {
          console.log('Error updating user:', error);
        });
    } else {
      console.log('No user is currently logged in');
    }
  }

  return (
    <div className='App-header'>
      <div className='App-form d-flex flex-column bg-primary'>
        <div className='friends'>
          <span style={{ marginBottom: "10px" }}>
            Друзья:
          </span>
          {friends && friends.map((friend: { id: string, accept: boolean }) =>
            <div className="card" style={{ marginBottom: 10 }}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">ID друга:{friend.id}</li>
                <li className="list-group-item">Статус заявки:{friend.accept ? "В друзьях" : "Заявка отправлена"}</li>
                <button onClick={() => deleteFriend(friend.id)} className='btn btn-danger'>Удалить</button>
              </ul>
            </div>
          )}
        </div>
        <div>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label className="col-form-label">Найти / Добавить друга</label>
            </div>
            <div className="col-auto">
              <input placeholder="Введите ID друга" type="text" value={id} onChange={(e) => setId(e.target.value)} className="form-control" aria-labelledby="passwordHelpInline" />
            </div>
            <div className="col-auto">
              <button type="submit" style={{ marginBottom: '0px !important' }} onClick={findById} className="btn btn-info btn-sm">FIND</button>
            </div>
          </div>
          <div>
            <div>Имя: {findUser?.name} </div>
            <div>Почта: {findUser?.email} </div>
            <div>Гендер: {findUser?.gender} </div>
            <button className="btn btn-dark" onClick={addNewFriend}>Добавить в друзья </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;