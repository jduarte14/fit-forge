const API_URL = 'http://192.168.1.98:4900';

export const handleUser = async (method, data, params, headers) => {
    try {
        let response;
        if (headers) {
             response = await fetch(API_URL + params, {
                method: method,
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        } else {
            response = await fetch(API_URL + params, {
                method: method,
                body: data,
            });
        }
        if (response.status == 200) {
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