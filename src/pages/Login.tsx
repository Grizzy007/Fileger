import React, { useEffect, useState } from 'react';
import Backendless from "backendless";

const Login = () => {

  Backendless.serverURL = "https://api.backendless.com";
  Backendless.initApp('88F13D1C-FC0C-2D37-FF91-A541959F4400', '4D32BF48-EE07-4934-B468-177BA8E02A23');

  const [emailLog, setEmailLog] = useState("")
  const [passwordLog, setPasswordLog] = useState("")
  const [restorePwd, setRestorePwd] = useState("")

  const log = () => {
    Backendless.UserService.login(emailLog, passwordLog, true).then((response: any) => {
      console.log(response)
    }).catch((e) => {
      alert(e)
    })
  }

  const help = () => {
    Backendless.UserService.restorePassword(restorePwd).then((response) => {
        console.log(response)
    })
}

  return (
    <div className="App">
      <div className="App-header">
        <div className='App-form d-flex flex-column bg-primary' >
          <div style={{ marginBottom: "20px" }}>LOGIN</div>
          <div style={{ flexWrap: "nowrap", justifyContent: 'space-between' }} className="mb-3 row">
            <label className="col-sm-4 col-form-label text-start">Email</label>
            <div className="col-sm-10 mb-1" style={{ width: '65%' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                style={{ fontSize: 12 }}
                onChange={(e) => setEmailLog(e.target.value)}
                value={emailLog}
              />
            </div>
          </div>
          <div style={{ flexWrap: "nowrap", justifyContent: 'space-between' }} className="mb-3 row">
            <label className="col-sm-4 col-form-label text-start">Password</label>
            <div className="col-sm-10 mb-1" style={{ width: '65%' }}>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                style={{ fontSize: 12 }}
                onChange={(e) => setPasswordLog(e.target.value)}
                value={passwordLog}
              />
            </div>
          </div>
          <div style={{ flexWrap: "nowrap", justifyContent: 'space-between' }} className="mb-3 row">
            <label className="col-sm-4 col-form-label text-start">Restore password</label>
            <div className="col-sm-10 mb-1" style={{ width: '40%' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                style={{ fontSize: 12 }}
                onChange={(e) => setRestorePwd(e.target.value)}
                value={restorePwd}
              />
            </div>
            <button onClick={help} className='btn btn-warning' style={{
              display: 'inline-block',
              padding: '0px 10px 0px 10px',
              width: 'auto',
              height: 32,
              marginRight: 10,
            }}>SEND</button>
          </div>
          <button type="button" className="btn btn-dark" onClick={log}>LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Login;