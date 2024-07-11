/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { BarLoader } from "react-spinners";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishContext";

function ProductDetails() {
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { id, category } = useParams();

  const getProductDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.error("Failed to fetch product details", error);
    }
  };

  const getRelatedProducts = async (category) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const allProducts = data.data;
      const related = allProducts.filter(
        (product) => product.category.name === category
      );
      setRelatedProducts(related);
    } catch (error) {
      console.error("Failed to fetch related products", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getProductDetails(id), getRelatedProducts(category)]).finally(
      () => {
        setIsLoading(false);
      }
    );
  }, [id, category]);

  if (isLoading) {
    return (
      <div className="w-[70%] mx-auto flex justify-center items-center">
        <BarLoader color="#36d7b7" />
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
    <>
      <div className="flex flex-wrap md:flex-row flex-col">
        <div className="md:w-1/4 w-full">
          <Slider {...settings}>
            {productDetails?.images.map((src, index) => (
              <img
                key={index}
                className="w-full"
                src={src}
                alt={productDetails?.title}
              />
            ))}
          </Slider>
        </div>
        <div className="md:w-3/4 w-full p-6 flex items-center">
        <div className="w-full">
          <h1 className="text-lg font-normal text-gray-950">
            {productDetails?.title}
          </h1>
          <p className="text-gray-600 font-light mt-4">
            {productDetails?.description}
          </p>
          <div className="flex my-4 justify-between items-center">
            <span>{productDetails?.price} EGP</span>
            <span>
              {productDetails?.ratingsAverage}{" "}
              <i className="fas fa-star text-yellow-400"></i>
            </span>
          </div>
          <button
            onClick={() => addProducttocart(productDetails?.id)}
            className="px-4 py-2 w-full rounded-lg text-white bg-green-600"
          >
            add to cart
          </button>
          <button
              onClick={() => {
                addToWishlist(productDetails?.id);
              }}
              className="px-4 py-2 mt-2 w-full rounded-lg text-white bg-yellow-600"
            >
              add to Wishlist
            </button>
        </div>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-row flex-col">
        {relatedProducts.map((product) => (
          <div key={product.id} className="md:w-1/6 w-full px-2">
            <div className="product py-4">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
                onClick={() => {
                  window.location.href = `/productdetails/${product.id}/${product.category.name}`;
                }}
              >
                <img
                  className="w-full"
                  src={product.imageCover}
                  alt={product.title}
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
    </>
  );
}

export default ProductDetails;
