import React from 'react'
import Userprofile from '../profile/Userprofile'

function SideBar({ username, age, gender, developer }) {
  return (
    <div className='bg-gradient-to-br from-green-200 to-green-300 w-[15%] h-full rounded-[10px] flex flex-col justify-between'>

      <Userprofile username={username} age={age} gender={gender} developer={developer}/>
      <h2 
        className="text-2xl text-black font-bold mb-24 w-full text-center" 
        style={{
          textShadow: '3px 5px 5px rgba(255, 215, 0, 0.5), -1px -1px 2px rgba(255, 215, 0, 0.6), 1px 1px 2px rgba(255, 215, 0, 0.6)'
        }}
      >
        DASHBORED
      </h2>

    </div>
  )
}

export default SideBar
