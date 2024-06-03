import { createContext, useContext, useState,
  useEffect } from "react";
  import { getCurrentUser } from "../lib/supabase";
  
  const GlobalContext = createContext();
  export const useGlobalContext = () => useContext(GlobalContext);
  
  const GlobalProvider = ({ children }) => {
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [user, setUser] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [trackedMeals, setTrackedMeals] = useState([]);

      useEffect(() => {
        const initializeUser = async () => {
          try {
            const currentUser = await getCurrentUser();
            if (currentUser) {
              setIsLoggedIn(true);
              setUser(currentUser);
            } else {
              setIsLoggedIn(false);
              setUser(null);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        };
    
        initializeUser();
      }, []);
      
        return (
          <GlobalContext.Provider
            value={{
              isLoggedIn,
              setIsLoggedIn,
              user,
              setUser,
              isLoading,
              selectedDate, 
              setSelectedDate,
              trackedMeals, 
              setTrackedMeals,
            }}
          >
            {children}
          </GlobalContext.Provider>
        );
      };
      
  export default GlobalProvider;