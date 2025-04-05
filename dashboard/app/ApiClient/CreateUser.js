import ipAddress from "../constant/ipAdress";


export const CreateUser = async ( username ) => {
    try {

        const response = await fetch(`http://${ipAddress}/create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });

    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        console.error("Error:", response.statusText);
    }
    } catch (error) {
        console.error("Error:", error);
    }
};