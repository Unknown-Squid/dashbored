'use client';
import React, { useEffect, useState } from 'react';
import SideBar from './sideBar/sideBar';
import { CgGenderFemale } from "react-icons/cg";
import { CgGenderMale } from "react-icons/cg";
import Image from 'next/image';
import baby from '../../public/gif/baby.gif';
import children from '../../public/gif/children.gif';
import teen from '../../public/gif/teen.gif';
import AgeBarChart from './graph/AgeBarChart';
import GenderPieChart from './graph/GenderPieChart';
import DeveloperChart from './graph/DeveloperChart';
import TotalVisitChart from './graph/TotalVisitChart';
import { useLogin } from '../context/LoginContext';
import Login from '../authentication/Login';
import { GetUserData } from '../ApiClient/GetUserData';
import { UpdateUserData } from '../ApiClient/UpdateUserData';

function Dashboard() {


  const { loginData } = useLogin();

  const [userData, setUserData] = useState(null);

  const [username, setUsername] = useState("");


  const [disable, setDisable] = useState(true);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [disable2, setDisable2] = useState(true);
  const [age, setAge] = useState(0);
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirm2, setConfirm2] = useState(false);
  const [confirm3, setConfirm3] = useState(false);
  
  const [data, setData] = useState([ 
    { value: 50, isVisible: true },
    { value: 60, isVisible: true },
    { value: 70, isVisible: true },
    { value: 80, isVisible: true },
    { value: 90, isVisible: true },
    { value: 100, isVisible: true },
    { value: 110, isVisible: true },
  ]);

  const ageClassification = [
    { classification: "toddler", color: "bg-[#FFC0CB]", graphColor: "#FFC0CB" },
    { classification: "children", color: "bg-[#FFD700]", graphColor: "#FFD700" },
    { classification: "teenager", color: "bg-[#87CEFA]", graphColor: "#87CEFA" },
    { classification: "young adult", color: "bg-[#32CD32]", graphColor: "#32CD32" },
    { classification: "adult", color: "bg-[#FFA500]", graphColor: "#FFA500" },
    { classification: "middle-aged adult", color: "bg-[#8A2BE2]", graphColor: "#8A2BE2" },
    { classification: "senior", color: "bg-[#808080]", graphColor: "#808080" },
  ];

  const toggleDataVisibility = (index) => {
    const newData = [...data];
    newData[index].isVisible = !newData[index].isVisible; // Toggle visibility
    setData(newData);
  };

  useEffect(() => {
    const fetchUserData = async () => {
        // Prioritize loginData if available, otherwise fallback to username
        const currentUsername = loginData?.username || username;

        if (currentUsername) {
            const data = await GetUserData(currentUsername);

            setUserData(data.data[0]);

            // Check for user attributes
            setConfirm(!!data.data[0].gender);
            setConfirm2(!!data.data[0].age);
            setConfirm3(!!data.data[0].developer);
        }
    };

    fetchUserData();
}, [loginData, username]);



  const handleUpdateData = async (dataInfo) => {
    const data = await UpdateUserData(userData.username, dataInfo);
    window.location.reload();
    console.log(data)
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, []);


  return (
    <div className='flex flex-col w-dvw h-dvh relative'>
        <div className={`p-2 bg-gradient-to-br from-green-200 w-full h-full gap-[15px] flex flex-row ${loginData || username ? "blur-none" : "blur-lg"}`}>

            <SideBar 
                username={userData ? userData.username : null} 
                age={userData && userData.age} 
                gender={userData && userData.gender}
                developer={userData && userData.developer == 1 ? "Developer" : null}  
            />

            <div className='bg-gradient-to-br from-green-200 to-green-300 w-[84%] h-full gap-6 flex flex-col items-center rounded-[10px]'>

                <div className='bg-transparent flex flex-row gap-3 px-2 mt-2 w-[98%] h-fit'>

                    <div className='shadow-2xl h-[300px] w-[33%] bg-white rounded-2xl relative'>

                        <div className={`absolute ${confirm ? "hidden" : "flex"} items-center justify-center flex-col top-0 left-0 h-full w-full rounded-2xl bg-black/[.3] z-10`}>
                            
                            <p className='w-auto h-auto text-white'>Contribute to our statistics</p>

                            <div className='flex flex-row gap-5 mb-5'>
                                <button
                                    onClick={() => {
                                        if (!male) {
                                            setMale(true); 
                                            setFemale(false); 
                                            setDisable(false);
                                        } else {
                                            setMale(false)
                                            setDisable(true);
                                        }
                                    }}
                                    type="button" 
                                    className={`flex justify-center gap-2 items-center shadow-xl text-xs backdrop-blur-md lg:font-semibold
                                            ${male ? "bg-blue-500 text-white" : "bg-white text-blue-500"} isolation-auto before:absolute 
                                            before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full 
                                            before:hover:left-0 before:rounded-full before:bg-blue-500 hover:text-white before:-z-10 
                                            before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 w-[90px] 
                                            py-2 overflow-hidden rounded-full group mt-3`}
                                >
                                    <CgGenderMale size={15} />
                                    Male
                                </button>

                                <button 
                                    onClick={() => {
                                        if (!female) {
                                            setMale(false);
                                            setFemale(true);
                                            setDisable(false);
                                        } else {
                                            setFemale(false);
                                            setDisable(true);
                                        }
                                    }}
                                    type="button" 
                                    className={`flex justify-center gap-2 items-center shadow-xl text-xs backdrop-blur-md lg:font-semibold 
                                            ${female ? "bg-pink-500 text-white" : "bg-white text-pink-500"} isolation-auto before:absolute 
                                            before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full 
                                            before:hover:left-0 before:rounded-full before:bg-pink-500 hover:text-white before:-z-10 
                                            before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 w-[90px] 
                                            py-2 overflow-hidden rounded-full group mt-3`}
                                >
                                    <CgGenderFemale size={15} />
                                    Female
                                </button>
                            </div>

                            <button 
                                onClick={() => (setConfirm(true), handleUpdateData({ gender: male ? "Male" : "Female" }))}
                                className={`w-[90px] py-2 cursor-pointer flex justify-center relative group overflow-hidden px-8 py-2 hover:bg-green-500 rounded-lg ${disable ? "pointer-events-none" : "pointer-events-auto"}`}
                                disabled={disable}
                            >
                                <span className="font-bold text-white text-sm relative z-10  duration-500">Confirm</span>
                                <span className="absolute top-0 left-0 w-full bg-black duration-500 group-hover:-translate-x-full h-full"></span>
                                <span className="absolute top-0 left-0 w-full bg-black duration-500 group-hover:translate-x-full h-full"></span>
                                
                                    <span className="absolute top-0 left-0 w-full bg-black duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
                                <span className="absolute delay-300 top-0 left-0 w-full bg-black duration-500 group-hover:translate-y-full h-full"></span>
                            </button>

                        </div>

                        <div className={`flex w-[100%] h-[100%] relative ${confirm ? "blur-none" : "blur-lg"}`}>
                            <GenderPieChart/>
                        </div>

                    </div>

                    <div className='shadow-2xl h-[300px] w-[33%] bg-white rounded-2xl relative'>

                        <div className={`absolute ${confirm2 ? "hidden" : "flex"} items-center justify-center flex-col top-0 left-0 h-full w-full rounded-2xl bg-black/[.3] gap-2 z-10`}>
                            
                            <p className='w-auto h-auto text-white'>Contribute to our statistics</p>

                            <div className='w-full flex flex-row justify-center items-center gap-10 mb-5'>
                                <div className="flex flex-col gap-2 items-center">
                                    <label>AGE</label>
                                    <input
                                        type="text" 
                                        className="w-[50px] h-[30px] text-black rounded-lg focus:outline-none focus:border-2 focus:border-blue-300 appearance-none text-center"
                                        maxLength="2" 
                                        onInput={(e) => {
                                            e.target.value = e.target.value.slice(0, 2);
                                            setAge(e.target.value);
                                            e.target.value > 0 ? setDisable2(false) : setDisable2(true);
                                        }}
                                    />
                                </div>
                                {age > 3 ?
                                    age > 12 ?
                                    <div className='rounded-lg overflow-hidden flex w-fit h-fit border border-black'>
                                        <Image
                                            src={teen}
                                            alt="baby animation"
                                            width={500}
                                            height={500}
                                            className="w-[80px] h-[80px]"
                                        />
                                    </div> : 
                                    <div className='rounded-lg overflow-hidden flex w-fit h-fit'>
                                        <Image
                                            src={children}
                                            alt="baby animation"
                                            width={500}
                                            height={500}
                                            className="w-[80px] h-[80px]"
                                        />
                                    </div> : 
                                    <div className='rounded-lg overflow-hidden flex w-fit h-fit border border-black'>
                                        <Image
                                            src={baby}
                                            alt="baby animation"
                                            width={500}
                                            height={500}
                                            className="w-[80px] h-[80px]"
                                        />
                                    </div>

                                }
                            </div>

                            <button 
                                onClick={() => (setConfirm2(true), handleUpdateData({ age: age }))}
                                className={`w-[90px] py-2 cursor-pointer flex justify-center relative group overflow-hidden px-8 py-2 hover:bg-green-500 rounded-lg ${disable2 ? "pointer-events-none" : "pointer-events-auto"}`}
                                disabled={disable2}
                            >
                                <span className="font-bold text-white text-sm relative z-10  duration-500">Confirm</span>
                                <span className="absolute top-0 left-0 w-full bg-black duration-500 group-hover:-translate-x-full h-full"></span>
                                <span className="absolute top-0 left-0 w-full bg-black duration-500 group-hover:translate-x-full h-full"></span>
                                
                                    <span className="absolute top-0 left-0 w-full bg-black duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
                                <span className="absolute delay-300 top-0 left-0 w-full bg-black duration-500 group-hover:translate-y-full h-full"></span>
                            </button>

                        </div>
                        
                        <div className={`flex w-[100%] h-[100%] relative ${confirm2 ? "blur-none" : "blur-lg"}`}>
                            
                            <div className='flex flex-wrap absolute w-[90%] h-[50px] bg-white justify-center gap-2 top-[10px] left-[10px]'>
                            {ageClassification.map((item, index) => {
                                return (
                                <button 
                                    key={index} 
                                    className='w-fit h-fit flex flex-row gap-2 text-black text-sm items-center z-10'
                                    type="button"
                                    onClick={() => toggleDataVisibility(index)}
                                    >
                                    <div className={`rounded-lg border border-black h-[10px] w-[20px] ${item.color}`}>

                                    </div>

                                    {item.classification}
                                </button>
                                );
                            })}
                            </div>
                            <AgeBarChart 
                            data={data} 
                            ageClassification={ageClassification} 
                            />
                        </div>

                    </div>

                    <div className='shadow-2xl h-[300px] w-[33%] bg-white rounded-2xl relative'>

                        <div className={`absolute ${confirm3 ? "hidden" : "flex"} items-center justify-center flex-col top-0 left-0 h-full w-full rounded-2xl bg-black/[.3] gap-2 z-10`}>
                                
                            <p className='w-auto h-auto text-white'>Contribute to our statistics</p>

                            <h4>
                                Are you a Developer?
                            </h4>
                            
                            <div className="flex flex-row gap-5 mb-5">

                                <button
                                    onClick={() => (setYes(true), setConfirm3(true), handleUpdateData({ developer: true }))}
                                    type="button" 
                                    className={`flex justify-center gap-2 items-center shadow-xl text-xs backdrop-blur-md lg:font-semibold
                                            ${yes ? "bg-green-500 text-white" : "bg-white text-green-500"} isolation-auto before:absolute 
                                            before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full 
                                            before:hover:left-0 before:rounded-full before:bg-green-500 hover:text-white before:-z-10 
                                            before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 w-[90px] 
                                            py-2 overflow-hidden rounded-full group mt-3`}
                                >
                                    Yes
                                </button>

                                <button 
                                    onClick={() => (setNo(true), setConfirm3(true), handleUpdateData({ developer: false }))}
                                    type="button" 
                                    className={`flex justify-center gap-2 items-center shadow-xl text-xs backdrop-blur-md lg:font-semibold 
                                            ${no ? "bg-red-500 text-white" : "bg-white text-red-500"} isolation-auto before:absolute 
                                            before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full 
                                            before:hover:left-0 before:rounded-full before:bg-red-500 hover:text-white before:-z-10 
                                            before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 w-[90px] 
                                            py-2 overflow-hidden rounded-full group mt-3`}
                                >
                                    No
                                </button>

                            </div>

                        </div>

                        <div className={`flex flex-col items-center w-[100%] h-[100%] relative ${confirm3 ? "blur-none" : "blur-lg"}`}>
                            <DeveloperChart/>
                        </div>


                    </div>

                </div>

                <div className='bg-white flex p-2 shadow-2xl rounded-2xl h-full w-[97%] relative mb-5'>

                    <TotalVisitChart/>

                </div>

            </div>

        </div>
        
        {!username ? 
            <Login /> : null
        }
    </div>
  )
}

export default Dashboard
