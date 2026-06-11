import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../utils/axios";

const EcommerceContext = createContext();

export const useEcommerce = () => useContext(EcommerceContext);

const EcommerceProvider = ({ children }) => {
  const [productCart, setProductCart] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [address, setAddress] = useState([]);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") ? true : false,
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (!isLogin) {
        return;
      }

      try {
        setIsLoadingAddress(true);
        const res = await api.get(`/address`);

        const address = res.data?.address;
        // console.log(res.data)
        setAddress(address || []);
      } catch (error) {
        console.error(
          error?.response?.data?.message || "Failed to fetch products:",
          error,
        );
      } finally {
        setIsLoadingAddress(false);
      }
    };

    fetchUserAddress();
  }, [isLogin]);

  useEffect(() => {
    const fetchUserCarts = async () => {
      if (!isLogin) {
        return;
      }

      try {
        setIsLoadingCart(true);
        const res = await api.get(`/cart`);

        const cart = res.data.cart;

        const transformCart = cart.map((product) => ({
          ...product.productId,
          quantity: product.quantity,
        }));

        setProductCart(transformCart || []);
        setIsLoadingCart(false);
      } catch (error) {
        console.error(
          error?.response?.data?.message || "Failed to fetch cart.",
          error,
        );
      } finally {
        setIsLoadingCart(false);
      }
    };

    fetchUserCarts();
  }, [isLogin]);

  useEffect(() => {
    const fetchUserWishlist = async () => {
      if (!isLogin) {
        return;
      }

      try {
        setIsLoadingWishlist(true);
        const res = await api.get(`/wishlist`);

        const transformData = res.data.wishlist.map((product) => ({
          ...product.productId,
        }));

        setIsLoadingWishlist(false);
        setWishList(transformData || []);
      } catch (error) {
        console.error(
          error?.response?.data?.message || "Failed to fetch wishlist.",
          error,
        );
      } finally {
        setIsLoadingWishlist(false);
      }
    };

    fetchUserWishlist();
  }, [isLogin]);

  const handleAddToCart = async (product, quantity, navigate) => {
    if (!isLogin) {
      setError("Login first to add product to cart.");
      return navigate("/login");
    }
    const tostId = toast.loading("Adding to cart...");

    try {
      const response = await api.post(`/cart`, {
        productId: product.id,
        quantity,
      });

      // console.log(response.data);
      setProductCart((prevCart) => {
        const exist = prevCart.find((cart) => cart.id === product.id);

        if (exist) {
          return prevCart.map((cart) => {
            return cart.id === product.id
              ? { ...cart, quantity: cart.quantity + 1 }
              : cart;
          });
        } else {
          return [...prevCart, { ...product, quantity }];
        }
      });

      toast.success(response.data?.message || "Product added to cart.", {
        id: tostId,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product to cart.",
        { id: tostId },
      );
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    const toastId = toast.loading("Increase quantity...");
    try {
      const response = await api.patch(`/cart/${productId}/increase`);

      // console.log(response.data);
      setProductCart((prevCart) => {
        return prevCart.map((cart) => {
          return cart.id === productId
            ? { ...cart, quantity: response.data.cart.quantity }
            : cart;
        });
      });

      toast.success(response.data?.message || "Quantity increased", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to increase quantity", { id: toastId });
      throw new Error("Error occurred while increase product quantity.");
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    const toastId = toast.loading("Decrease quantity...");
    try {
      const response = await api.patch(`/cart/${productId}/decrease`);

      console.log(response.data);

      toast.success(response.data?.message || "Quantity decreased", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to decrease quantity", { id: toastId });
      throw new Error("Error occurred while decrease product quantity.");
    }

    setProductCart((prevCart) => {
      const exist = prevCart.find((cart) => cart.id === productId);
      if (exist.quantity !== 1) {
        return prevCart.map((cart) => {
          return cart.id === productId
            ? { ...cart, quantity: cart.quantity - 1 }
            : cart;
        });
      } else {
        return [...prevCart.filter((cart) => cart.id !== productId)];
      }
    });
  };

  const handleRemoveFromCart = async (productId) => {
    const tostId = toast.loading("Remove from cart...");

    try {
      const response = await api.patch(`/cart/${productId}/remove`);

      setProductCart((prevCart) =>
        prevCart.filter((cart) => cart.id !== productId),
      );

      console.log(response.data);

      toast.success(
        response.data?.message || "Successfully removed from cart.",
        { id: tostId },
      );
    } catch (error) {
      throw new Error("Error occurred while remove product form cart.");
    }
  };

  const handleAddToWishList = async (product, navigate) => {
    if (!isLogin) {
      setError("Please login, to add product to cart.");
      return navigate("/login");
    }

    const tostId = toast.loading("Adding to wishlist...");

    try {
      const response = await api.post(`/wishlist/${product.id}`);

      setWishList((prevStat) => {
        const exist = prevStat.find(
          (wishProduct) => wishProduct.id === product.id,
        );
        if (exist) {
          toast.success("Product removed from wishlist.", { id: tostId });
          return prevStat.filter(
            (wishProduct) => wishProduct.id !== product.id,
          );
        } else {
          toast.success("Successfully added to wishlist.", { id: tostId });

          return [...prevStat, { ...product }];
        }
      });

      console.log(response.data);
    } catch (error) {
      throw new Error(error || "Error occurred while add product to wishlist.");
    }
  };

  const handleRemoveToWishList = async (product) => {
    const tostId = toast.loading("Removing from  wishlist...");
    try {
      const response = await api.post(`/wishlist/${product?.id}`);

      console.log(response.data);
      setWishList((prevStat) => {
        const exist = prevStat.find(
          (wishProduct) => wishProduct.id === product.id,
        );
        if (exist) {
          toast.success("Product removed from wishlist.", { id: tostId });
          return prevStat.filter(
            (wishProduct) => wishProduct.id !== product.id,
          );
        } else {
          return [...prevStat, { ...product }];
        }
      });
    } catch (error) {
      throw new Error(
        error || "Error occurred while removing product from wishlist.",
      );
    }
  };

  const handleWishListToCart = async (product) => {
    const tostId = toast.loading("Adding to cart...");

    try {
      const response = await api.patch(`/wishlist/${product?.id}`);

      console.log(response.data);

      setProductCart((prevStat) => {
        const exist = prevStat.find((cartPrd) => cartPrd.id === product.id);

        if (exist) {
          toast.success("Product already exist on cart.", { id: tostId });
          return prevStat.map((cart) => {
            return cart.id === product.id
              ? { ...cart, quantity: cart.quantity + 1 }
              : cart;
          });
        } else {
          toast.success("Product moved to Cart.", { id: tostId });
          return [...prevStat, { ...product, quantity: 1 }];
        }
      });

      setWishList((prevStat) =>
        prevStat.filter((wishPrd) => wishPrd.id !== product.id),
      );
    } catch (error) {
      throw new Error(error || "Error occurred while move to cart.");
    }
  };

  const handleCartToWishList = async (product) => {
    const tostId = toast.loading("Adding to wishlist...");

    try {
      const response = await api.patch(`/cart/${product?.id}/moveto_wishlist`);

      setWishList((prevStat) => {
        const exist = prevStat.find((wishPrd) => wishPrd.id === product.id);

        if (exist) {
          return prevStat;
        } else {
          return [...prevStat, { ...product }];
        }
      });

      setProductCart((prevCart) =>
        prevCart.filter((cart) => cart.id !== product.id),
      );
      toast.success(response.data?.message || "Product moved to Wishlist.", {
        id: tostId,
      });
      // console.log(response.data);
    } catch (error) {
      throw new Error("Error occurred while move to wishlist.");
    }
  };

  const handleAddAddress = (address) => {
    setAddress((prevStat) => [...prevStat, { ...address, isDefault: false }]);
  };

  const handleRemoveAddress = (addressId) => {
    setAddress((prevStat) =>
      prevStat.filter((address) => address.id !== addressId),
    );
  };

  const handleUpdateAddress = (updatedAddress) => {
    setAddress((prevStat) => {
      return prevStat.map((prevAdd) => {
        return prevAdd.id === updatedAddress.id
          ? { ...prevAdd, ...updatedAddress }
          : prevAdd;
      });
    });
  };

  const handleSelectDefaultAddress = async (address) => {
    const toastId = toast.loading("Adding default address...");
    try {
      const response = await api.patch(`/address/update/${address.id}/default`);

      // console.log(response.data);

      setAddress((prevStat) => {
        return prevStat.map((userAdd) => ({
          ...userAdd,
          isDefault: userAdd.id === address.id,
        }));
      });

      toast.success(
        response.data?.message || "Default address set successfully.",
        { id: toastId },
      );
    } catch (error) {
      toast.error("Failed to update address isDefault status.", {
        id: toastId,
      });
    }
  };

  const handleCancelOrder = async (id, revalidator) => {
    const toastId = toast.loading("Order cancel...");
    try {
      const response = await api.delete(`/order/${id}`);

      // console.log(response.data);
      revalidator();
      toast.success(response.data?.message || "Order canceled successfully.", {
        id: toastId,
      });
    } catch (error) {
      toast.success("Error occurred while cancel order.", { id: toastId });
      throw new Error("Failed to cancel order.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser({ name: "", email: "" });
    setIsLogin(false);
    setProductCart([]);
    setWishList([]);
    setAddress([]);
    toast.success("User logout successfully.");
  };

  return (
    <EcommerceContext.Provider
      value={{
        error,
        user,
        setUser,
        isLogin,
        setIsLogin,
        setError,
        logout,
        isLoadingAddress,
        isLoadingWishlist,
        isLoadingCart,
        searchText,
        setProductCart,
        setSearchText,
        handleAddToCart,
        productCart,
        wishlist,
        address,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveFromCart,
        handleRemoveToWishList,
        handleWishListToCart,
        handleCartToWishList,
        handleAddToWishList,
        handleAddAddress,
        handleRemoveAddress,
        handleUpdateAddress,
        handleSelectDefaultAddress,
        handleCancelOrder,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
export default EcommerceProvider;
