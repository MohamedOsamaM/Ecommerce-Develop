import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate} from "react-router-dom";
import { useContext } from "react";
import { PacmanLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
Navigate
export default function Wishlist() {
  const {getcartItems}= useContext(CartContext);
  const handleRefresh = () => {
    window.location.reload(true); // Force reload without cache
  };
  const [wishProd, setWishProd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addtocart } = useContext(CartContext);
  useEffect(() => {
    getdata();
  }, []);
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

  if (isLoading) {
    return (
      <div className="py-8 w-full flex justify-center">
        <PacmanLoader color="#36d7b7" />
      </div>
    );
  }

  function getdata() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("UserToken"),
        },
      })
      .then((res) => {
        setWishProd(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function removeWishItem(pId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${pId}`, {
        headers: {
          token: localStorage.getItem("UserToken"),
        },
      })
      .then((res) => {
        console.log(res);
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex md:flex-row flex-col flex-wrap py-8 px-4 items-center">
      {wishProd?.map((product) => (
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
                removeWishItem(product.id);
              }}
              className="px-4 py-2 w-full rounded-lg text-white bg-red-600 mt-2"
            >
              remove Item
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
