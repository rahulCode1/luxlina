import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiPackage,
  FiUser,
  FiShoppingBag,
  FiLogIn,
  FiLogOut,
  FiX,
  FiHome,
  FiLock,
} from "react-icons/fi";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import { useState } from "react";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isNavigationOpen, setNavigationOpen] = useState(false);
  const { setSearchText, productCart, wishlist, searchText, isLogin, logout } =
    useEcommerce();
  const navigate = useNavigate();
  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  const updateQuaryParam = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
    navigate(`/products?${params}`);
  };

  const clearSearch = () => {
    setSearchText("");
    updateQuaryParam("search", "");
  };

  const toggleNavBar = () => {
    setNavigationOpen((prevStat) => !prevStat);
  };

  const handleLogout = () => {
    logout();
    toggleNavBar();
  };
  return (
    <>
      <header className="w-full bg-white border-b border-gray-200">
        <nav>
          {/* Top row */}
          <div className="flex items-center justify-between  px-3 md:px-5 h-14">
            <h2 className="text-xl font-semibold text-gray-900 m-0">Luxlina</h2>

            <div className="hidden md:block grow mx-5">
              {/* Inline search for md and large screen */}
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  placeholder="Search products…"
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full h-[38px] rounded-[10px] border border-gray-200 bg-gray-50 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-gray-900 placeholder-gray-400 text-sm px-3.5 pr-8 outline-none transition-all"
                />
                {searchText && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <FiX size={13} />
                  </button>
                )}
                <button
                  onClick={() => updateQuaryParam("search", searchText)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <FiSearch size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <li className="list-none hidden md:block">
                <NavLink
                  to="/"
                  className="relative flex items-center justify-center w-10 h-10 rounded-[10px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiHome size={18} />
                </NavLink>
              </li>

              <li className="list-none hidden md:block">
                <NavLink
                  to="/products"
                  className="relative flex items-center justify-center w-10 h-10 rounded-[10px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiShoppingBag size={18} />
                </NavLink>
              </li>

              {/* Wishlist */}
              {isLogin && (
                <li className="list-none">
                  <NavLink
                    to="/wishlist"
                    className="relative flex items-center justify-center w-10 h-10 rounded-[10px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FiHeart size={18} />
                    {wishlist.length > 0 && (
                      <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 flex items-center justify-center bg-violet-600 text-white text-[10px] font-semibold rounded-full px-1">
                        {wishlist.length}
                      </span>
                    )}
                  </NavLink>
                </li>
              )}

              {/* Cart */}
              {isLogin && (
                <li className="list-none">
                  <NavLink
                    to="/cart"
                    className="relative flex items-center justify-center w-10 h-10 rounded-[10px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FiShoppingCart size={18} />
                    {totalItemsInCart > 0 && (
                      <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 flex items-center justify-center bg-violet-600 text-white text-[10px] font-semibold rounded-full px-1">
                        {totalItemsInCart}
                      </span>
                    )}
                  </NavLink>
                </li>
              )}

              {/* Menu toggle */}
              <button
                onClick={toggleNavBar}
                className="flex items-center justify-center w-10 h-10 rounded-[10px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {isNavigationOpen ? "X" : "☰"}
              </button>
            </div>
          </div>

          {/* Search for small screen*/}
          <div className="px-3 pb-3.5 md:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                placeholder="Search products…"
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full h-[38px] rounded-[10px] border border-gray-200 bg-gray-50 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-gray-900 placeholder-gray-400 text-sm px-3.5 pr-8 outline-none transition-all"
              />
              {searchText && (
                <button
                  onClick={clearSearch}
                  className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <FiX size={13} />
                </button>
              )}
              <button
                onClick={() => updateQuaryParam("search", searchText)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <FiSearch size={14} />
              </button>
            </div>
          </div>

          {/* Dropdown */}
          {isNavigationOpen && (
            <div className="border-t border-gray-100 py-1.5">
              {[
                { to: "/", label: "Home", Icon: FiHome },
                { to: "/products", label: "Products", Icon: FiShoppingBag },
                ...(isLogin
                  ? [
                      {
                        to: "/orders",
                        label: "My Orders",
                        Icon: FiPackage,
                      },
                      { to: "/user", label: "Profile", Icon: FiUser },
                    ]
                  : [
                      { to: "/signup", label: "Signup", Icon: FiLock },
                      { to: "/login", label: "Login", Icon: FiLogIn },
                    ]),
              ].map(({ to, label, Icon }) => (
                <li key={to} className="list-none" onClick={toggleNavBar}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-5 py-2.5 text-sm no-underline transition-colors
                 ${
                   isActive
                     ? "bg-violet-50 text-violet-600 font-medium"
                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                 }`
                    }
                  >
                    <Icon size={16} />
                    {label}
                  </NavLink>
                </li>
              ))}

              {isLogin && (
                <>
                  <div className="h-px bg-gray-100 my-1 mx-5" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
