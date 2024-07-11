/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let CartContext = createContext();
export default function CartContextProvider(props) {
  const [cartCountItems, setCartCountItems] = useState(0);
  let headers = {
    token: localStorage.getItem("UserToken"),
  };
  const [totalprice, setTotal] = useState(null);
  function addtocart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getcartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => {
        setTotal(response.data.data.totalCartPrice);
        setCartCountItems(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }
  function removefromcart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function UpdatecartItems(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  useEffect(() => {
    getcartItems();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cartCountItems,
        setCartCountItems,
        addtocart,
        getcartItems,
        removefromcart,
        UpdatecartItems,
        totalprice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
