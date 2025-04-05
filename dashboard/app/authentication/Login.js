"use client";
import React, { useState } from 'react';
import { useLogin } from '../context/LoginContext';
import GraphDisplay from '../component/graph/GraphDisplay';
import { CreateUser } from '../ApiClient/CreateUser';
import { Snackbar, Alert, AlertTitle, Slide } from "@mui/material";
import { LoginUser } from '../ApiClient/LoginUser';

function Login() {

    const { loginData, setLoginData } = useLogin();
    const [username, setUsername] = useState("");

    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("");

    const handleRegistration = async () => {
        const user = { username };
        const data = await CreateUser(username);


        if (data){
            setSnackbarSeverity(data.status)
            setSnackbarMessage(data.message)
            setSnackbar(true)
        }
    };

    const handleLogin = async () => {
        const user = { username };
        const data = await LoginUser(username);
    
        if (data) {
            setSnackbarSeverity(data.status);
            setSnackbarMessage(data.message);
            setSnackbar(true);
    
            if (data.status !== "error") {
                setLoginData(user);
                localStorage.setItem("username", username); // Save username to localStorage
            } 
        }
    };
    

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setSnackbar(false);
    };

  return (
    <div className={`items-center justify-center absolute top-0 ${loginData ? "hidden" : "flex"} left-0 bg-black/[.5] w-full h-full z-10`}>

            <div className='w-[30%] h-[80%] bg-black/[.8] flex flex-col items-center shadow-white shadow-lg gap-5 relative overflow-hidden'>

                <h3 className='w-full text-center text-xl mt-8'>SIMPLE DASHBORED</h3>
                <div className='w-full h-1/2 flex flex-col items-center justify-start gap-5'>
                    
                    <div className='w-[50%] flex flex-col items-start gap-2 mt-10'>
                        <label className='w-[100%]' htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className='w-full border-b border-white/[.4] text-slate-500 bg-transparent p-2 focus:outline-0 focus:border-white'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className='flex gap-5 w-[50%] mt-8'>
                        <button type="button" className='flex-1' onClick={handleRegistration}>Register</button>
                        <button type="button" className='flex-1' onClick={handleLogin}>Login</button>
                    </div>

                </div>

                <GraphDisplay/>

            </div>

            <Snackbar
                slots={{ transition: Slide }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert severity={snackbarSeverity} variant="filled" sx={{ width: "100%" }}>
                <AlertTitle>
                    <p className="font-pmedium">{snackbarSeverity === "success" ? "Success" : "Error"}</p>
                </AlertTitle>
                <p className="font-pregular">{snackbarMessage}</p>
                </Alert>
            </Snackbar>
    </div>
  )
}

export default Login
