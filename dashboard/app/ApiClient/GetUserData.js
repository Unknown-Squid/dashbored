import ipAddress from "../constant/ipAdress";

export const GetUserData = async (username) => {
  try {
    const response = await fetch(
      `http://${ipAddress}/get-user-data?username=${encodeURIComponent(username)}`,
      {
        method: "GET", // Change to GET method
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
