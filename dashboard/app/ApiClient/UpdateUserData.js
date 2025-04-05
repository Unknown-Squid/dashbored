import ipAddress from "../constant/ipAdress";

export const UpdateUserData = async (username, updateData) => {
  try {
    if (!username || !updateData) {
      throw new Error("Username and update data are required.");
    }

    const payload = { username };

    if (updateData.gender !== undefined) {
      payload.gender = updateData.gender;
    }

    if (updateData.age !== undefined) {
      payload.age = updateData.age;
    }

    if (updateData.developer !== undefined) {
      payload.developer = updateData.developer;
    }

    const response = await fetch(`http://${ipAddress}/update-user-data`, {
      method: "PUT", // Use POST unless your server expects PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

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
