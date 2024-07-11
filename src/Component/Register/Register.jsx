/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
function Register() {
  const [error, setError] = useState("");
  const [isLoading,setIsloading] = useState(false);
  let navigate = useNavigate();
  function handlesubmit(formvalues) {
    setIsloading(true)
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formvalues)
      .then((Api) => {
        setError(Api?.response?.data?.message);
        setIsloading(false);
        navigate('/login');
      })
      .catch((Api) => {
        setError(Api?.response?.data?.message);
        setIsloading(false);
      });
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "name should not be less than 3 character")
      .max(10, "name should not be greater than 10 character")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    phone: Yup.string()
      .matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/, "phone must be egyptian number")
      .required("phone is required"),
    password: Yup.string()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "password is invalid")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and repassword must be the same")
      .required("password is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handlesubmit,
  });
  useEffect(() => {}, []);
  return (
    <>
      {error ? (
        <div className="text-red-600 text-center bg-red-300 rounded p-5 text-md font-bold mb-5 w-1/5 mx-auto">
          {error}
        </div>
      ) : null}
      <form className="max-w-md mx-auto mb-10" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none    focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-green-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name ? (
          <p className="text-red-500 mb-3">{formik.errors.name}</p>
        ) : (
          ""
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none    focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-green-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <p className="text-red-500 mb-3">{formik.errors.email}</p>
        ) : (
          ""
        )}
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
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <p className="text-red-500 mb-3">{formik.errors.password}</p>
        ) : null}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="rePassoword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none    focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            required
          />
          <label
            htmlFor="rePassoword"
            className="peer-focus:font-medium absolute text-sm text-green-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            rePassword
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <p className="text-red-500 mb-3">{formik.errors.rePassword}</p>
        ) : null}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none    focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-green-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone ? (
          <p className="text-red-500 mb-3">{formik.errors.phone}</p>
        ) : null}
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
        >
          {isLoading===true?<i className="fa-solid fa-spinner fa-spin"></i>:'Submit'}
        </button>
      </form>
    </>
  );
}

export default Register;