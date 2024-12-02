import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext } from 'react';
import { handleUser } from './userController.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [logged, setUserLogged] = useState(false);

  const createUser = async (newUser) => {
    try {
      const formData = new FormData();
      formData.append("email", newUser.credentials.email);
      formData.append("password", newUser.credentials.password);
      formData.append("avatar", { uri: newUser.credentials.avatar, type: 'image/jpeg', name: 'avatar.jpg' });
      formData.append("username", newUser.credentials.username);

      const response = await handleUser("POST", formData, "/auth/user");
      if (response.status == "success") {
        console.log("setea el user", newUser);
        setUser(response.user);
      }
      return response;
    }
    catch (error) {
      console.error(error.message);
    }
  };


  const logUser = async (user) => {
    try {
      const formData = new URLSearchParams();
      formData.append("email", user.email);
      formData.append("password", user.password);
      const response = await handleUser("POST", formData.toString(), "/auth/user/login", true);
      if (response.status == "success") {
        setToken(response.user._id);
        
        setUser(response.user);
        if (response.user.owner) {
          setOwnerData(response.gym);
        } 
      }
    }
    catch {
      console.error(error.message);
    }
  }

  const setToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem("token");
    } catch (error) {
      console.error(error.message);
    }
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error(error.message);
    }
  }

  const getUser = async (id) => {
    try {
      const response = await handleUser("GET", null, `/auth/user/${id}`);
      if (response.status == "success") {
        setUser(response.user_found);
        if(response.gym) {
          setOwnerData(response.gym);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const patchUser = async (userData, id) => {
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        formData.append(key, userData[key]);
      });
      const response = await handleUser("PATCH", formData, `/auth/user/${id}`);
      if (response.status == "success") {
        setUser(response.user_updated);
      } else {
        console.error(error.message);
      }

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <UserContext.Provider value={{ user, createUser, logUser, setToken, getToken, getUser, patchUser, removeToken, ownerData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
