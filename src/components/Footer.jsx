import {
  FiPackage,
  FiShoppingCart,
  FiUser,
  FiHome,
  FiLogIn,
  FiLock,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";

const Footer = () => {
  const { productCart, isLogin } = useEcommerce();

  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  return (
    <footer className="d-md-none position-fixed bottom-0 start-0 bg-light w-100">
      <div className="container">
        <ul className="navbar-nav d-flex flex-row justify-content-evenly">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-dark text-light rounded shadow px-3" : ""
                } nav-link`
              }
              end
            >
              <FiHome size={22} />
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-dark text-light rounded shadow px-3" : ""
                } nav-link`
              }
            >
              <FiPackage size={22} />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-dark text-light rounded shadow px-3" : ""
                } nav-link position-relative`
              }
            >
              <FiShoppingCart size={22} />
              {totalItemsInCart > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                  style={{ fontSize: "0.65rem", padding: "0.25em 0.5em" }}
                >
                  {totalItemsInCart}
                </span>
              )}
            </NavLink>
          </li>

          {!isLogin && (
            <li className="nav-item">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-dark text-light rounded shadow px-3" : ""
                  } nav-link`
                }
              >
                <FiLock size={22} />
              </NavLink>
            </li>
          )}

          {!isLogin && (
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-dark text-light rounded shadow px-3" : ""
                  } nav-link`
                }
              >
                <FiLogIn size={22} />
              </NavLink>
            </li>
          )}

          {isLogin && (
            <li className="nav-item">
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-dark text-light rounded shadow px-3" : ""
                  } nav-link`
                }
              >
                <FiUser size={22} />
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
