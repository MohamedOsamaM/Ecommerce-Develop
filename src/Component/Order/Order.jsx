import axios from "axios";
import { useState } from "react";

export default function Order() {
  const [loadorder, setLoadorder] = useState(false);
  function getCartid(city, address, phone) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("UserToken"),
        },
      })
      .then((res) => {
        getOrder(res.data.data._id, city, address, phone);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getOrder(cId, city, address, phone) {
    setLoadorder(true); // Set loading state before making the request
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cId}?url=http://localhost:5173`,
        {
          shippingAddress: {
            details: address,
            phone: phone,
            city: city,
          },
        },
        {
          headers: {
            token: localStorage.getItem("UserToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          window.location.href = res.data.session.url;
        }
        setLoadorder(false); // Set loading state to false after request completes
      })
      .catch((err) => {
        console.error(err);
        setLoadorder(false); // Set loading state to false if there is an error
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let c = e.target.city.value;
    let a = e.target.address.value;
    let p = e.target.phone.value;
    getCartid(c, a, p);
  }

  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <form className="w-[40%] mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Number
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {loadorder ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Order"
          )}
        </button>
      </form>
    </div>
  );
}
