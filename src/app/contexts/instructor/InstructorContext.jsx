import React, { createContext, useState, useContext } from 'react';
import { handleInstructor } from './instructorController';


const InstructorContext = createContext();

export const InstructorProvider = ({ children }) => {
  const [instructor, setInstructor] = useState(null);
  const [instructorsList, setInstructorsList] = useState(null);

  const getInstructors = async () => {
    try {
      const response = await handleInstructor("GET", null, "/api/instructors");
      if (response.status == "success") {
        setInstructorsList(response.instructors);
      }
    }
    catch (error) {
      console.error(error.message);
    }
  };


  const createInstructor = async (newInstructor, userId) => {
    try {
      const formData = new FormData();

      formData.append("name", newInstructor.credentials.name);
      formData.append("phone", newInstructor.credentials.phone);
      formData.append("email", newInstructor.credentials.email);
      formData.append("description", newInstructor.description.description);
      formData.append("userId", userId);
      formData.append("avatar", { uri: newInstructor.credentials.avatar, type: 'image/jpeg', name: 'avatar.jpg' });
      for (const specialty of newInstructor.specialty) {
        formData.append(`specialty[${specialty}]`, "true");
      }

      const response = await handleInstructor('POST', formData, "/api/instructors");

      if (response?.status === 200) {
        setInstructor(response.instructor);
      } else {
        console.error(response.status, "error");
      }
      return response;
    }
    catch (error) {
      console.error(error.message);
    }
  };


  const patchInstructor = async (instructor, instructorId) => {
    try {
      const formData = new FormData();

      formData.append("description", instructor.description);
      for (const specialty of instructor.specialty) {
        formData.append(`specialty[${specialty}]`, "true");
      }
      const response = await handleInstructor('PATCH', formData, "/api/instructors/" + instructorId);

      if (response?.status === 200) {
        setInstructor(response.instructor);
      } else {
        console.error(response.status, "error");
      }
      return response;
    }
    catch (error){ 
      console.error(error.message);
    }
  }

  return (
    <InstructorContext.Provider value={{ instructor, createInstructor, patchInstructor, getInstructors, instructorsList }}>
      {children}
    </InstructorContext.Provider>
  );
};

export const useInstructor = () => {
  return useContext(InstructorContext);
};
