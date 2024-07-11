/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../assets/NothingFound.png";
import { BarLoader } from "react-spinners";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishContext";
function Spbrand() {
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
  let { id } = useParams();
  const [Brandname, setBrandname] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [Isloading, setIsloading] = useState(false);
  function getspBrand(id) {
    setIsloading(true);
    let api = axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((response) => setBrandname(response.data.data.name))
      .catch((error) => error);
  }

  function getrelatedproduct(brandname) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allproducts = data.data;
        let related = allproducts.filter(
          (product) =>
            product.brand.name.toLowerCase() == brandname.toLowerCase()
        );
        setrelatedProducts(related);
      })
      .catch(() => {});
    setIsloading(false);
  }
  useEffect(() => {
    getspBrand(id);
  }, [id]);

  useEffect(() => {
    if (Brandname != null) {
      getrelatedproduct(Brandname);
    }
  }, [Brandname]);
  if (Isloading == true) {
    return (
      <>
        <div className="w-[70%] mx-auto flex justify-center items-center">
          <BarLoader color="#36d7b7" />
        </div>
      </>
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
      <div className="w-[90%] mx-auto">
        {relatedProducts?.length == 0 ? (
          <img src={image} className="w-[50%] mx-auto h-[500px]"></img>
        ) : (
          <div className="flex flex-wrap md:flex-row flex-col">
            {relatedProducts?.map((product) => (
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
        )}
      </div>
    </>
  );
}

export default Spbrand;
