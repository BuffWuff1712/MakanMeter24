// __mocks__/GlobalProvider.tsx
import React from 'react';

const mockContext = {
  isLoading: false,
  isLoggedIn: false,
  setUser: jest.fn(),
  setIsLoggedIn: jest.fn(),
};

const GlobalContext = React.createContext(mockContext);

const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={mockContext}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => React.useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
