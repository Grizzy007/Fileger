import React, { useEffect, useState } from 'react';
import Backendless from "backendless";

const Profile = () => {

  Backendless.serverURL = "https://api.backendless.com";
  Backendless.initApp('88F13D1C-FC0C-2D37-FF91-A541959F4400', '4D32BF48-EE07-4934-B468-177BA8E02A23');

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [country, setCountry] = useState("")
  const [gender, setGender] = useState("")

  const [newName, setNewName] = useState(name)
  const [newAge, setNewAge] = useState(age)
  const [newCountry, setNewCountry] = useState(country)
  const [newGender, setNewGender] = useState(gender)

  useEffect(() => {
    Backendless.UserService.getCurrentUser().then((response: any) => {
      console.log(response)
      setId(response.objectId)
      setName(response.name)
      setAge(response.age)
      setCountry(response.country)
      setGender(response.gender)
      setNewName(response.name)
      setNewAge(response.age)
      setNewCountry(response.country)
      setNewGender(response.gender)
    })
  }, [])

  const updateUser = () => {
    Backendless.UserService.update({
      objectId: id,
      name: newName,
      age: newAge,
      country: newCountry,
      gender: newGender
    }).then((response: any) => {
      console.log(response)
    })
  }

  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [desc, setDesc] = useState("")

  const saveGeoPoint = () => {
    Backendless.Data.of("Place").save({ location: `POINT (${x} ${y})`, description: desc }).then((response) => {

    }).catch((e) => {
      alert(e)
    })
  }

  return (
    <div className='App-header'>
      <div className='App-form d-flex flex-column bg-primary '>
        <div className="card" style={{marginBottom: 10}}>
          <div className="card-header text-white fw-bold bg-secondary">
            Профиль
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="row g-3 align-items-center" style={{justifyContent: 'space-between'}}>
                <div className="col-auto">
                  <label className="col-form-label">Имя -{name}-</label>
                </div>
                <div className="col-auto">
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" className="form-control" />
                </div>
              </div>
            </li>
            <li className="list-group-item"><div className="row g-3 align-items-center" style={{justifyContent: 'space-between'}}>
              <div className="col-auto">
                <label className="col-form-label">Возраст -{age}-</label>
              </div>
              <div className="col-auto">
                <input value={newAge} onChange={(e) => setNewAge(e.target.value)} type="text" className="form-control" />
              </div>
            </div></li>
            <li className="list-group-item"><div className="row g-3 align-items-center" style={{justifyContent: 'space-between'}}>
              <div className="col-auto">
                <label className="col-form-label">Страна -{country}-</label>
              </div>
              <div className="col-auto">
                <input value={newCountry} onChange={(e) => setNewCountry(e.target.value)} type="text" className="form-control" />
              </div>
            </div></li>
            <li className="list-group-item"><div className="row g-3 align-items-center" style={{justifyContent: 'space-between'}}>
              <div className="col-auto">
                <label className="col-form-label">Гендер -{gender}-</label>
              </div>
              <div className="col-auto">
                <input value={newGender} onChange={(e) => setNewGender(e.target.value)} type="text" className="form-control" />
              </div>
            </div></li>
            <li className="list-group-item"><button className='btn btn-dark' onClick={updateUser}>Update</button></li>
          </ul>
        </div>

        <div className="input-group">
          <input className='form-control' placeholder="x" value={x} onChange={(e) => setX(e.target.value)} />
          <input className='form-control' placeholder="y" value={y} onChange={(e) => setY(e.target.value)} />
          <input className='form-control' placeholder="Описание" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <button className="btn btn-dark" type="button" id="button-addon2">Button</button>
        </div>
      </div>
    </div >
  );
};

export default Profile;