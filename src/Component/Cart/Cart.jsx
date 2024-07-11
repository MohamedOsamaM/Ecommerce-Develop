/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { BarLoader } from "react-spinners";
import axios from "axios";
function Cart() {
  const [cartid, setCartid] = useState(null);
  const [Isloading, setIsloading] = useState(true);
  const [cartDetails, setCartDetails] = useState(null);
  let { getcartItems, removefromcart, UpdatecartItems, totalprice } =
    useContext(CartContext);
  async function getcart() {
    setIsloading(true);
    let response = await getcartItems();
    setCartDetails(response.data);
    setIsloading(false);
  }
  async function removeProductFromCart(productId) {
    setIsloading(true);
    let response = await removefromcart(productId);
    setCartDetails(response.data);
    setIsloading(false);
    getcartItems()
  }
  async function updateQuantity(productId, count) {
    setIsloading(true);
    // if (count<1){
    //     return;
    // }
    if (count < 1) {
      removeProductFromCart(productId);
    }
    let response = await UpdatecartItems(productId, count);
    setCartDetails(response.data);
    setIsloading(false);
    getcartItems()
  }
  useEffect(() => {
    getcart();
  }, []);

  if (Isloading == true) {
    return (
      <>
        <div className="w-[70%] mx-auto flex justify-center items-center">
          <BarLoader color="#36d7b7" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className=" my-5 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-75 mx-auto text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.data.products.map((product) => (
              <tr
                key={product.product.id}
                className="bg-white border-b  hover:bg-gray-50 "
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateQuantity(product.product.id, product.count - 1)
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>{product.count}</div>
                    <button
                      onClick={() =>
                        updateQuantity(product.product.id, product.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <span
                    onClick={() => removeProductFromCart(product.product.id)}
                    href="#"
                    className="font-medium text-red-600  hover:underline cursor-pointer"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-orange-400 text-center text-3xl font-bold my-5">Total Price is <span className="text-green-400 mx-2 ">{totalprice}</span>EGP</div>
        <button
          onClick={() => {
            window.location.href = "/order";
          }}
          className="px-4 py-2 w-full rounded-lg text-white bg-green-400 mt-2"
        >
          Order Cart
        </button>
      </div>
    </>
  );
}

export default Cart;
