// LocationContext.js
import { useState, useContext, createContext } from "react";
const CityContext = createContext();
const CityProvider = ({ children }) => {
  const [city, setCity] = useState("");
  // const [name,setName]=useState("");
  return (
    <CityContext.Provider value={[ city, setCity ]}>
      {children}
    </CityContext.Provider>
  );
};
// Custom hook
const useCity = () => useContext(CityContext);
export { useCity, CityProvider };