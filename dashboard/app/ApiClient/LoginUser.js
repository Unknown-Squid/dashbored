// ----- For Server node.js and mysql database -----
// import ipAddress from "../constant/ipAdress";


// export const LoginUser = async ( username ) => {
//     try {

//         const response = await fetch(`http://${ipAddress}/login-user`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username }),
//         });

//     if (response.ok) {
//         const data = await response.json();
//         return data
//     } else {
//         console.error("Error:", response.statusText);
//     }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// };


import users from "../LocalDB/db.json"; // adjust the path as needed

export const LoginUser = async (username) => {
    try {
        const user = users.find(
            (u) => u.username === username
        );

        if (user) {
            return { success: true, user };
        } else {
            return { success: false, message: "Invalid credentials" };
        }
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "An error occurred" };
    }
};