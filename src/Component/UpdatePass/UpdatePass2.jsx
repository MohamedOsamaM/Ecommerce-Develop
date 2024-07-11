/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function UpdatePass2(){
    let [UserPasscode,setUserpasscode] = useState(null);
    const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  let navigate = useNavigate();
  function handlesubmit(formvalues) {
    setIsloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        "resetCode": `${formvalues.resetCode}`,
      })
      .then((Api) => {
        console.log(Api);
        setError(Api?.data?.message);
        setIsloading(false);
        navigate("/UpdatePassword3");
      })
      .catch((Api) => {
        setError(Api?.response?.data?.message);
        setIsloading(false);
      });
  }

  let validationSchema = Yup.object().shape({
    resetCode: Yup.string().max(6,'resetCode must be six numbers').min(6,'resetCode must be six numbers').required("resetCode is required"),
  });
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handlesubmit,
  });
  return (
    <>
      <form
        className="max-w-md mx-auto mb-[215px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            maxLength={6}
            minLength={6}
            name="resetCode"
            id="resetCode"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none    focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-sm text-green-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            resetCode
          </label>
        </div>
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <p className="text-red-500 mb-3">{formik.errors.resetCode}</p>
        ) : (
          ""
        )}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
        >
          {isLoading === true ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Send"
          )}
        </button>
        {/* <p>Your Password is {UserPasscode} </p> */}
      </form>
    </>
  );
}