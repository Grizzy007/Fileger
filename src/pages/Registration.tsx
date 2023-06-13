import React, { useEffect, useState } from 'react';
import Backendless from "backendless";

const Registration = () => {

  Backendless.serverURL = "https://api.backendless.com";
  Backendless.initApp('88F13D1C-FC0C-2D37-FF91-A541959F4400', '4D32BF48-EE07-4934-B468-177BA8E02A23');

  // const [currentUser, setCurrentUser] = useState<any>()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [country, setCountry] = useState("")
  const [gender, setGender] = useState("")
  const reg = () => {
    const user = new Backendless.User()
    user.email = email
    user.password = password
    // @ts-ignore
    user.name = name
    // @ts-ignore
    user.age = age
    // @ts-ignore
    user.country = country
    // @ts-ignore
    user.gender = gender
    Backendless.UserService.register(user).then((response) => {
      Backendless.Files.upload("reg.txt", `users/${name}`)
      Backendless.Files.upload("reg.txt", `users/${name}/sharedWithMe`)
    })
  }

  useEffect(() => {
    Backendless.UserService.isValidLogin().then(response => {
      console.log(response)
    })
  }, [])

  // useEffect(() => {
  //   Backendless.UserService.isValidLogin().then(response => {
  //     console.log(response)
  //   })
  // }, [])

  // useEffect(() => {
  //   Backendless.UserService.getCurrentUser().then((response: any) => {
  //     console.log(response)
  //     setCurrentUser(response)
  //   })
  // }, [])

  return (
    <div className="App">
      <div className="App-header">
        <div className='App-form d-flex flex-column bg-primary' >
          <div style={{ marginBottom: "20px" }}>REGISTRATION</div>
          <div style={{ flexWrap: "nowrap", justifyContent: 'space-between' }} className="mb-3 row">
            <label className="col-sm-2 col-form-label text-start">Email</label>
            <div className="col-sm-10 mb-1" style={{ width: '70%' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                style={{ fontSize: 12 }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <div style={{ flexWrap: "nowrap", justifyContent: 'space-between' }} className="mb-3 row">
            <label className="col-sm-2 col-form-label text-start">Password</label>
            <div className="col-sm-10 mb-1" style={{ width: '70%' }}>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                style={{ fontSize: 12 }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          <div style={{ flexWrap: "nowrap", justifyContent: 'space-between' }} className="mb-3 row">
            <label className="col-sm-2 col-form-label text-start">Name</label>
            <div className="col-sm-10 mb-1" style={{ width: '70%' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                style={{ fontSize: 12 }}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
          <div style={{ flexWrap: "nowrap", justifyContent: 'space-between' }} className="mb-3 row">
            <label className="col-sm-2 col-form-label text-start">Age</label>
            <div className="col-sm-10 mb-1" style={{ width: '70%' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your age"
                style={{ fontSize: 12 }}
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
            </div>
          </div>
          <div style={{ flexWrap: "nowrap", justifyContent: 'space-between' }} className="mb-3 row">
            <label className="col-sm-2 col-form-label text-start">Country</label>
            <div className="col-sm-10 mb-1" style={{ width: '70%' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your country"
                style={{ fontSize: 12 }}
                onChange={(e) => setCountry(e.target.value)}
                value={country} 
              />
            </div>
          </div>
          <div style={{ flexWrap: "nowrap", justifyContent: 'space-between' }} className="mb-3 row">
            <label className="col-sm-2 col-form-label text-start">Gender</label>
            <div className="col-sm-10 mb-1" style={{ width: '70%' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your gender"
                style={{ fontSize: 12 }}
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              />
            </div>
          </div>
          <button type="button" className="btn btn-dark" onClick={reg}>REGISTER</button>
        </div>
      </div>
    </div>
  );
};

export default Registration;