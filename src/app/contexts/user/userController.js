const API_URL = 'https://ejercitate-backend.onrender.com';

export const handleUser = async (method, data, params)=>{
    try {
        const response = await fetch(API_URL + params, {
            method: method,
            body: data,
        });

        if(response.status == 200) {
            const data = response.json();
            console.log(data, "esto llegaria");
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