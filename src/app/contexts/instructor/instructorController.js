const API_URL = 'https://fitforgebackend.vercel.app';

export const handleInstructor = async (method, data, params)=>{
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