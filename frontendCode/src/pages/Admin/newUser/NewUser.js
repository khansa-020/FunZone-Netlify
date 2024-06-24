import React, { useState } from 'react'
import Navbar from '../../../components/adminComp/navbar/Navbar'
import Sidebar from '../../../components/adminComp/sidebar/Sidebar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import '../newUser/newUser.scss'
import { Helmet } from 'react-helmet';
const NewUser = ({inputs, title}) => {
  const [file,setFile]=useState("");
  return (
    <div className="newUser">
      {/* <Helmet>
                <style>{'body { background-color: #fff }'}</style>
      </Helmet> */}
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1 className='title'>{title}</h1>
        </div>
        <div className="bottom">
          <div className="leftContainer">
            <img src={file ? URL.createObjectURL(file): "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="rightContainer">
            <form>
            <div className="FormInput">
                <label style={{cursor:'pointer'}} htmlFor='file'>Image: <DriveFolderUploadIcon className='icon'/></label>
                <input type="file" id='file' onChange={e=>setFile(e.target.files[0])} style={{display:'none'}}/>
              </div>
              {inputs.map((input)=>(
                <div className="FormInput" key={input.id}>
                <label>{input.label}</label>
                <input type={input.type} placeholder={input.placeholder} />
              </div>
              ))}

              
              <button>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUser