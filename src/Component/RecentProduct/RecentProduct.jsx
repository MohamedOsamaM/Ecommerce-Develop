/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishContext";

export default function RecentProduct() {
  const {getWishData} = useContext(WishContext)
  const {getcartItems}= useContext(CartContext);
  let { addtocart } = useContext(CartContext);
  async function addProducttocart(productId) {
    let x = await addtocart(productId);
    if (x.data.status === "success") {
      console.log("added");
      toast.success("Product added to cart", {
        position: "bottom-left",
      });
      getcartItems()
    } else {
      console.log("error");
      toast.error("Product not added to cart", {
        position: "bottom-left",
      });
    }
    console.log(x);
  }
  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecent,
    staleTime: 5000,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    select: (data) => data.data.data,
  });
  if (isLoading) {
    return (
      <div className="py-8 w-full flex justify-center">
        <PacmanLoader color="#36d7b7" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-red-600 text-center bg-red-300 rounded p-5 text-md font-bold mb-5 w-1/5 mx-auto">
        {error}
      </div>
    );
  }
  function addToWishlist(pId) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: `${pId}`,
        },
        {
          headers: {
            token: localStorage.getItem("UserToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          console.log("added");
          toast.success("Product added to Wishlist", {
            position: "bottom-left",
          });
          getWishData()
        }
      })
      .catch((err) => {
        console.log("error");
        toast.error("Product not added to Wishlist", {
          position: "bottom-left",
        });
      });
  }
  return (
    <div className="flex md:flex-row flex-col flex-wrap py-8 px-4 items-center">
      {data?.map((product) => (
        <div key={product.id} className="md:w-1/6 w-full px-2">
          <div className="product py-4">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img
                className="w-full"
                src={product?.imageCover}
                alt={product?.title}
              />
              <span className="block font-light mt-2 text-green-600">
                {product.category.name}
              </span>
              <h3 className="text-lg font-normal text-gray-800 mb-4">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <div className="flex justify-between items-center">
                <span>{product.price} EGP</span>
                <span>
                  {product.ratingsAverage}{" "}
                  <i className="fas fa-star text-yellow-400"></i>
                </span>
              </div>
            </Link>
            <button
              onClick={() => addProducttocart(product.id)}
              className="px-4 py-2 w-full rounded-lg text-white bg-green-600"
            >
              add to cart
            </button>
            <button
              onClick={() => {
                addToWishlist(product.id);
              }}
              className="px-4 py-2 mt-2 w-full rounded-lg text-white bg-yellow-600"
            >
              add to Wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
