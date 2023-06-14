import React, { useEffect, useState } from 'react';
import Backendless from "backendless";

const Home = () => {

  Backendless.serverURL = "https://api.backendless.com";
  Backendless.initApp('88F13D1C-FC0C-2D37-FF91-A541959F4400', '4D32BF48-EE07-4934-B468-177BA8E02A23');

  const [currentUser, setCurrentUser] = useState<any>()

  const [image, setImage] = useState<any>("")

  const handleFile = () => {
    Backendless.Files.upload(image, `users/${currentUser.name}`).then((response) => {
      console.log(response)
    })
  }

  const [nameFolder, setNameFolder] = useState("")

  const createFolder = () => {
    Backendless.Files.upload("reg.txt", `/users/${currentUser.name}/${nameFolder}`).then((response) => {

    }).catch((e) => {
      alert(e)
    })
  }

  const [nameFolderDelete, setNameFolderDelete] = useState("")

  const deleteFolder = () => {
    Backendless.Files.remove(`users/${currentUser.name}/${nameFolderDelete}`)
  }

  const [list, setList] = useState<any>()

  const fetchList = () => {
    Backendless.Files.listing(`users/${currentUser.name}/sharedWithMe`).then((response) => {
      setList(response)
    })
  }
  console.log('list', list)

  useEffect(() => {
    Backendless.UserService.isValidLogin().then(response => {
      console.log('isValidLogin', response)
    })
  }, [])

  useEffect(() => {
    Backendless.UserService.getCurrentUser().then((response: any) => {
      console.log('getCurrentUser', response)
      setCurrentUser(response)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {image &&
          <img src={URL.createObjectURL(image)} style={{ width: "100px", height: "100px", objectFit: "contain" }}
            alt="product-img" />
        }
        <div className="mb-3" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          <label className="form-label">Default file input example</label>
          <input style={{ marginBottom: 10 }} className="form-control" type="file" onChange={
            (e) => setImage(e.target.files && e.target.files[0])
          } />
          <button style={{ width: '100%' }} type="button" className="btn btn-primary" onClick={handleFile}>SEND FILE</button>
        </div>

        <div className="mb-3" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          <label className="form-label">Create folder</label>
          <input style={{ marginBottom: 10 }} className="form-control" placeholder="name folder/file" onChange={(e) => setNameFolder(e.target.value)} value={nameFolder} />
          <button style={{ width: '100%' }} type="button" className="btn btn-primary" onClick={createFolder}>CREATE FOLDER</button>
        </div>

        <div className="mb-3" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          <label className="form-label">Delete folder/file by name</label>
          <input style={{ marginBottom: 10 }} className="form-control" placeholder="name folder/file" value={nameFolderDelete}
            onChange={(e) => setNameFolderDelete(e.target.value)} />
          <div className="d-flex justify-content-around" style={{ width: '100%' }}>
            <button className="btn btn-danger btn-sm" type="button" onClick={deleteFolder}>DELETE</button>
            <button className="btn btn-info btn-sm text-light" type="button" onClick={fetchList}>GET LIST</button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {list?.map((item: any) =>
            <div>
              <iframe src={item.publicUrl} style={{ width: "200px", height: "200px" }} />
              <a href={item.publicUrl}>{item.name}</a>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Home;