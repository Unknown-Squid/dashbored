import React from 'react'
import Userprofile from '../profile/Userprofile'

function SideBar({ username, age, gender, developer }) {
  return (
    <div className='bg-gradient-to-br from-green-200 to-green-300 w-[15%] h-full rounded-[10px]'>

      <Userprofile username={username} age={age} gender={gender} developer={developer}/>
      
    </div>
  )
}

export default SideBar
