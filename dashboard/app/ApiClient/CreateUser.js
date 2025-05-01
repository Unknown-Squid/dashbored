// import ipAddress from "../constant/ipAdress";


// export const CreateUser = async ( username ) => {
//     try {

//         const response = await fetch(`http://${ipAddress}/create-user`, {
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

export const CreateUser = async (username, password) => {
    try {
      const response = await fetch('/ApiClient/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        return { success: false, message: error.message };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: 'An error occurred' };
    }
};
  