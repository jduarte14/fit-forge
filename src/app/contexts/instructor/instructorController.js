const API_URL = 'http://192.168.1.98:4900/';

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