import { Navigate } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";

const ProtectedRoutes = ({ children }) => {
  const { isLogin } = useEcommerce();

  if (!isLogin) {
    return <Navigate to="/login" replace/>;
  }

  return children;
};


export default ProtectedRoutes