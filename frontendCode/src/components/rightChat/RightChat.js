import React from 'react'
import './rightChat.css'
const RightChat = () => {
  return (
    <div className="right">
        <i className='uil uil-search serachIcon'></i>
        <input className='searchUser' type='text' placeholder='Search Users...'/>
    </div>
  )
}

export default RightChat