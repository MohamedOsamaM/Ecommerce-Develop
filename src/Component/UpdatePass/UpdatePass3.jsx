/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function UpdatePass3() {
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  let navigate = useNavigate();
  function handlesubmit(formvalues) {
    setIsloading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        "email": `${localStorage.getItem('UserEmail')}`,
        "newPassword": `${formvalues.password}`,
      })
      .then((Api) => {
        localStorage.setItem("UserToken", Api?.data?.token);
        setError(Api?.data?.message);
        setIsloading(false);
        navigate("/login");
      })
      .catch((Api) => {
        setError(Api?.response?.data?.message);
        setIsloading(false);
      });
  }

  let validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "password is invalid"
      )
      .required("password is required"),
  });
  let formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: handlesubmit,
  });

  return (
    <>
      {error ? (
        <div className="text-red-600 text-center bg-red-300 rounded p-5 text-md font-bold mb-5 w-1/5 mx-auto">
          {error}
        </div>
      ) : null}
      <form
        className="max-w-md mx-auto mb-[215px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none    focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-green-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your New Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <p className="text-red-500 mb-3">{formik.errors.password}</p>
        ) : null}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
        >
          {isLoading === true ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Change"
          )}
        </button>
      </form>
    </>
  );
}
