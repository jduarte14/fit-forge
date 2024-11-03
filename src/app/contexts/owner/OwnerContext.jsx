import React, { createContext, useState, useContext } from 'react';
import { handleOwner } from './OwnerController.js';


const OwnerContext = createContext();

export const OwnerProvider = ({ children }) => {
  const [Owner, setOwner] = useState(null);

  const createGym = async (gym, userId) => {
    try {
    const formData = new FormData();
    
    formData.append("latitude", "-3333345");
    formData.append("longitude", "-3333345");
    //Dinamicos
    formData.append("name", gym.description.gymName);
    formData.append("description", gym.description.description);
    formData.append("address", gym.description.address);
    formData.append("userId", userId);
    formData.append("schedules[days]", `${gym.schedules.startDays} to ${gym.schedules.endDays}`);
    formData.append("schedules[hours]", `${gym.schedules.startHours} to ${gym.schedules.endHours}`);
    for (const key in gym.prices) {
        if (gym.prices.hasOwnProperty(key)) {
            formData.append(`prices[${key}]`, gym.prices[key]);
        }
    }

    for (const facility of gym.facilities) {
        formData.append(`facilities[${facility}]`, "true");
    }
    for (const sport of gym.sports) {
        formData.append(`sports[${sport}]`, "true");
    }
    gym.gallery.forEach((image, index) => {
        if (index === 0) {
          formData.append("imagen", { uri: image, type: 'image/jpeg', name: 'imagen.jpg' });
        } else {
          formData.append(`imagen${index}`, { uri: image, type: 'image/jpeg', name: `imagen_${index}.jpg` });
        }
      });
      

     const response = handleOwner('POST', formData, "/api/gyms");
     if(response?.status === 200) {
      setOwner(response.gyms);
      console.log(response, "__response__");
    } else {
      console.log(response.status, "error");
    }
    return response;
    
    }
    catch(error) {
      console.error(error.message);
    }
  };

  return (
    <OwnerContext.Provider value={{ Owner, createGym }}>
      {children}
    </OwnerContext.Provider>
  );
};

export const useOwner = () => {
  return useContext(OwnerContext);
};
