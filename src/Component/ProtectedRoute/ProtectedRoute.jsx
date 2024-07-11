/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("UserToken") !== null) {
    return props.children;
  } else {
    return <Navigate to="/login"/>;
  }
}
