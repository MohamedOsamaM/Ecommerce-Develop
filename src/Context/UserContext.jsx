/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
export let UserContext = createContext();
export default function UserContextProvider(props) {
    const [userLogin,setUserLogin] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem('UserToken')!==null)
            {
                setUserLogin(localStorage.getItem('UserToken'));
            }
    },[])
  return (
    <UserContext.Provider value={{userLogin,setUserLogin}}>{props.children}</UserContext.Provider>
  );
}
