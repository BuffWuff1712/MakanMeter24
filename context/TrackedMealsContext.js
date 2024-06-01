import React, { createContext, useState, useContext } from 'react';

const TrackedMealsContext = createContext();

export const TrackedMealsProvider = ({ children }) => {
  const [trackedMeals, setTrackedMeals] = useState([]);

  return (
    <TrackedMealsContext.Provider value={{ trackedMeals, setTrackedMeals }}>
      {children}
    </TrackedMealsContext.Provider>
  );
};

export const useTrackedMeals = () => useContext(TrackedMealsContext);
