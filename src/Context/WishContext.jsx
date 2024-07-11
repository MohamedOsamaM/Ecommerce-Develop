/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let WishContext = createContext();
export default function WishContextProvider(props) {
    const [WishCount ,setWishCount] = useState(0);
  const getWishData = () => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("UserToken"),
        },
      })
      .then((res) => {
        setWishCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
    getWishData()
  },[])
  return (
    <WishContext.Provider value={{WishCount, setWishCount, getWishData}}>{props.children}</WishContext.Provider>
  );
}
