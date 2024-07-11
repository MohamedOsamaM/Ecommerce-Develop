/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishContext } from "../../Context/WishContext";

function Navbar() {
  const { WishCount } = useContext(WishContext);
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  const { cartCountItems } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  function logout() {
    localStorage.removeItem("UserToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-green-400 py-5 sticky top-0 left-0 right-0 z-[99999]">
        <div
          className="md:hidden block absolute top-[25px] right-[10%]"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <i className="fa-solid fa-bars cursor-pointer text-white p-1 border-2 border-white"></i>
        </div>

        <div className="w-[90%] mx-auto flex md:flex-row flex-col justify-between md:items-center md:gap-5 font-semibold">
          <ul className="flex md:flex-row flex-col md:gap-5 md:items-center">
            <li>
              <h1 className="text-2xl font-bold text-lime-700">
                <i className="fa-solid fa-cart-shopping text-lime-700 me-2"></i>
                FreshCart
              </h1>
            </li>
            {userLogin !== null && (
              <>
                <li className={open ? "block" : "hidden md:block"}>
                  <ul className="flex md:flex-row flex-col md:gap-5">
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/cart">Cart</NavLink>
                    </li>
                    <li>
                      <NavLink to="/products">Products</NavLink>
                    </li>
                    <li>
                      <NavLink to="/brands">Brands</NavLink>
                    </li>
                    <li>
                      <NavLink to="/categories">Categories</NavLink>
                    </li>
                    <li>
                      <NavLink to="/wishlist">Wishlist</NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
          <ul
            className={`${
              open ? "flex" : "hidden md:flex"
            } md:flex-row flex-col md:gap-5 md:items-center`}
          >
            {userLogin === null ? (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="cursor-pointer relative">
                  <Link to="/wishlist">
                    <i className="fa-solid fa-heart" />
                    <span className="text-sm p-1 text-white w-fit bg-green-600">
                      {WishCount}
                    </span>
                  </Link>
                </li>
                <li className="cursor-pointer relative">
                  <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping" />
                    <span className="text-sm p-1 text-white w-fit bg-green-600">
                      {cartCountItems}
                    </span>
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={logout}>
                  Logout
                </li>
              </>
            )}

            <li className="flex md:flex-row flex-col md:gap-3 gap-1 md:mt-0 mt-1 cursor-pointer">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-tiktok"></i>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
