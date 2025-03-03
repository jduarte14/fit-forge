const API_URL = 'http://192.168.1.98:4900';
export const handleOwner = async (method, data, params) => {
    try {
        const response = await fetch(API_URL + params, {
            method: method,
            body: data,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            const errorData = await response.json();
            console.error('Error from server:', errorData);
            throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("There was an error during the request:", error.message);
        throw error;
    }
};