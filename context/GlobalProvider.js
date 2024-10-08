import { createContext, useContext, useState,
  useEffect } from "react";
  import { getCurrentUser, getMealsForDate } from "../lib/supabase";
  
  const GlobalContext = createContext();
  export const useGlobalContext = () => useContext(GlobalContext);
  
  const GlobalProvider = ({ children }) => {
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [user, setUser] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [refresh, setRefresh] = useState(false);
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [trackedMeals, setTrackedMeals] = useState([]);
      const [mealsData, setMealsData] = useState({});
      const [period, setPeriod] = useState(0);
      const [macros, setMacros] = useState(null);
      const [calorieGoals, setCalorieGoals] = useState(null);
      const [macroGoals, setMacroGoals] = useState(null);
      const [isAsyncOperationsComplete, setIsAsyncOperationsComplete] = useState(true);
      const [currentPlan, setCurrentPlan] = useState(null);
      const [streak, setStreak] = useState(0);
      const [lastLoggedDate, setLastLoggedDate] = useState(null);
      const [userInitData, setUserInitData] = useState({
        gender: '',
        age: '',
        height: '',
        weight: '',
        activityLevel: 'Sedentary',
      });
      
    

      useEffect(() => {
        const initializeUser = async () => {
          try {
            const currentUser = await getCurrentUser();
            if (currentUser) {
              setIsLoggedIn(true);
              setUser(currentUser);
              const data = await getMealsForDate(currentUser, selectedDate);
              setMealsData(data);
            } else {
              setIsLoggedIn(false);
              setUser(null);
            }

          } catch (error) {
            console.log("error: ", error);
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
              mealsData, 
              setMealsData,
              refresh,
              setRefresh,
              period,
              setPeriod,
              macros,
              setMacros,
              userInitData,
              setUserInitData,
              isAsyncOperationsComplete, 
              setIsAsyncOperationsComplete,
              currentPlan,
              setCurrentPlan,
              calorieGoals, 
              setCalorieGoals,
              macroGoals, 
              setMacroGoals,
              streak, 
              setStreak, 
              lastLoggedDate, 
              setLastLoggedDate,
            }}
          >
            {children}
          </GlobalContext.Provider>
        );
      };
      
  export default GlobalProvider;