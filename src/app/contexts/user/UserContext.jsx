import React, { createContext, useState, useContext } from 'react';
import { handleUser } from './userController.js';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = async (newUser) => {
    try {
    const formData = new FormData();
    formData.append("email", newUser.credentials.email);
    formData.append("password", newUser.credentials.password);
    formData.append("avatar", { uri:newUser.credentials.avatar, type:'image/jpeg', name:'avatar.jpg' });
    formData.append("username", newUser.credentials.username);
    
    const response = await handleUser("POST", formData, "/auth/user" ); 
    console.log(response, "en el state");
    if(response.status) {
      console.log(response.user);
      setUser(response.user);
    }
    return response;
    }
    catch(error) {
      console.error(error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
