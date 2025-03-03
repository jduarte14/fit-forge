import React, { createContext, useState, useContext } from 'react';
import { handleStore } from './StoreController';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(null);
  const [storesList, setStoresList] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);

  const getStores = async () => {
    try {
      const response = await handleStore("GET", null, "/api/stores");
      if (response.status === "success") {
        setStoresList(response.stores);
      }
    } catch (error) {
      console.error("Error fetching stores:", error.message);
    }
  };

  const createStore = async (newStore, userId) => {
    try {
      const formData = new FormData();
      formData.append("name", newStore.name);
      formData.append("description", newStore.description);
      formData.append("address", newStore.address);
      formData.append("type", newStore.type);
      formData.append("customId", newStore.customId);
      formData.append("id", userId);

      if (newStore.images) {
        newStore.images.forEach((image, index) => {
          formData.append(`files`, {
            uri: image.uri,
            type: 'image/jpeg',
            name: `store_image_${index}.jpg`
          });
        });
      }

      const response = await handleStore('POST', formData, "/api/store/create");

      if (response.status === "success") {
        setStore(response.data);
      } else {
        console.error("Error creating store:", response.status);
      }
      return response;
    } catch (error) {
      console.error("Error creating store:", error.message);
    }
  };

  const getStore = async (storeId) => {
    try {
      const response = await handleStore("GET", null, `/api/stores/${storeId}`);
      if (response.status === "success") {
        setStore(response.store);
      } else {
        console.error("Error fetching store:", response.status);
      }
      return response;
    } catch (error) {
      console.error("Error fetching store:", error.message);
    }
  };

  const getProductsByStore = async (storeId) => {
    try {
      const response = await handleStore("GET", null, `/api/products/store/${storeId}`);
      if (response.status === "success") {
        setStoreProducts(response.products);
      } else {
        console.error("Error fetching store products:", response.status);
      }
      return response;
    } catch (error) {
      console.error("Error fetching store products:", error.message);
    }
  };

  return (
    <StoreContext.Provider value={{ 
      store, createStore, getStore, getStores, storesList, getProductsByStore, storeProducts 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
