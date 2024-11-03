const API_URL = 'https://ejercitate-backend.onrender.com';

export const handleInstructor = async (method, data, params)=>{
    console.log(data, "coso");
    try {
        const response = await fetch(API_URL + params, {
            method: method,
            body: data,
        });

        if(response.status == 200) {
            const data = response.json();
            return data;
        }
        else {
            console.error(response);
        }
    }
    catch {
        console.error("There was an error authenticating the user");
    }
}