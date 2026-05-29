import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const EcommerceContext = createContext();

export const useEcommerce = () => useContext(EcommerceContext);

const EcommerceProvider = ({ children }) => {
  const [productCart, setProductCart] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [address, setAddress] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [error, setError] = useState("");

  const fetchUserAddress = async () => {
    try {
      setIsLoadingAddress(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}address/69384436ebe3d68324ec1040`,
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Error occurred while fetching address.",
        );
      }

      const address = data.data?.address;

      setAddress(address || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
    setIsLoadingAddress(false);
  };

  const fetchAllOrders = async () => {
    try {
      setIsLoadingOrders(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}order/69384436ebe3d68324ec1040`,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error occurred while fetching order.");
      }

      const orders = data.data?.orders;

      const transformOrders = orders.map((order) => ({
        id: order._id,
        totalPrice: order.summary.totalPrice,
        totalDiscount: order.summary.totalDiscount,
        totalQuantity: order.summary.totalQuantity,
        address: { ...order.address },
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        products: order.products.map((product) => ({
          quantity: product.quantity,
          ...product.productId,
        })),
      }));

      setUserOrders(transformOrders || []);
    } catch (error) {
      console.error("Failed to fetch orders.", error);
    }
    setIsLoadingOrders(false);
  };

  const fetchUserCarts = async () => {
    try {
      setIsLoadingCart(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/69384436ebe3d68324ec1040`,
      );

      if (!res.ok) {
        throw new Error("Error occurred while fetching cart.");
      }

      const data = await res.json();
      const cart = data.cart;

      const transformCart = cart.map((product) => ({
        ...product.productId,
        quantity: product.quantity,
      }));

      setProductCart(transformCart || []);
      setIsLoadingCart(false);
    } catch (error) {
      console.error("Failed to fetch cart.", error);
    }
  };

  const fetchUserWishlist = async () => {
    try {
      setIsLoadingWishlist(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}wishlist/69384436ebe3d68324ec1040`,
      );

      if (!res.ok) {
        throw new Error("Error occurred while fetching wishlist.");
      }

      const data = await res.json();
      const transformData = data.wishlist.map((product) => ({
        ...product.productId,
      }));

      setIsLoadingWishlist(false);
      setWishList(transformData || []);
    } catch (error) {
      console.error("Failed to fetch wishlist.", error);
    }
  };

  const handleAddToCart = async (product, quantity) => {
    const tostId = toast.loading("Adding to cart...");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/69384436ebe3d68324ec1040`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            quantity,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      toast.error("Failed to add product to cart.", { id: tostId });
    }

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

    toast.success("Product added to cart.", { id: tostId });
  };

  const handleIncreaseQuantity = async (productId) => {
    const toastId = toast.loading("Increase quantity...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/69384436ebe3d68324ec1040`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to increase product quantity in  cart.",
        );
      }

      setProductCart((prevCart) => {
        return prevCart.map((cart) => {
          return cart.id === productId
            ? { ...cart, quantity: data.cart.quantity }
            : cart;
        });
      });

      toast.success("Quantity increased", { id: toastId });
    } catch (error) {
      toast.error("Failed to increase quantity", { id: toastId });
      throw new Error("Error occurred while increase product quantity.");
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    const toastId = toast.loading("Decrease quantity...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/decrease/69384436ebe3d68324ec1040`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to decrease product quantity in  cart.",
        );
      }

      toast.success("Quantity decreased", { id: toastId });
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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/remove/69384436ebe3d68324ec1040`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove product from cart.");
      }
    } catch (error) {
      throw new Error("Error occurred while remove product form cart.");
    }

    setProductCart((prevCart) =>
      prevCart.filter((cart) => cart.id !== productId),
    );

    toast.success("Successfully removed from cart.", { id: tostId });
  };

  const handleAddToWishList = async (product) => {
    const tostId = toast.loading("Adding to wishlist...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}wishlist/69384436ebe3d68324ec1040`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product to wishlist.");
      }
    } catch (error) {
      throw new Error(error || "Error occurred while add product to wishlist.");
    }

    setWishList((prevStat) => {
      const exist = prevStat.find(
        (wishProduct) => wishProduct.id === product.id,
      );
      if (exist) {
        toast.success("Product removed from wishlist.", { id: tostId });
        return prevStat.filter((wishProduct) => wishProduct.id !== product.id);
      } else {
        toast.success("Successfully added to wishlist.", { id: tostId });

        return [...prevStat, { ...product }];
      }
    });
  };

  const handleRemoveToWishList = async (product) => {
    const tostId = toast.loading("Remove to wishlist...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}wishlist/69384436ebe3d68324ec1040`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product to wishlist.");
      }
    } catch (error) {
      throw new Error(
        error || "Error occurred while remove product to wishlist.",
      );
    }

    setWishList((prevStat) => {
      const exist = prevStat.find(
        (wishProduct) => wishProduct.id === product.id,
      );
      if (exist) {
        toast.success("Product removed from wishlist.", { id: tostId });
        return prevStat.filter((wishProduct) => wishProduct.id !== product.id);
      } else {
        return [...prevStat, { ...product }];
      }
    });
  };

  const handleWishListToCart = async (product) => {
    const tostId = toast.loading("Adding to cart...");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}wishlist/69384436ebe3d68324ec1040`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product.id }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product not move to cart.");
      }
    } catch (error) {
      throw new Error(error || "Error occurred while move to cart.");
    }

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
  };

  const handleCartToWishList = async (product) => {
    const tostId = toast.loading("Adding to wishlist...");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/moveto_wishlist/69384436ebe3d68324ec1040`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product.id }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product not move to wishlist.");
      }
    } catch (error) {
      throw new Error("Error occurred while move to wishlist.");
    }

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
    toast.success("Product moved to Wishlist.", { id: tostId });
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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}address/update/${address.id}/default`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update address status.");
      }

      toast.success("Default address set successfully.", { id: toastId });
    } catch (error) {
      toast.error("Failed to update address isDefault status.", {
        id: toastId,
      });
      throw new Error(error);
    }

    setAddress((prevStat) => {
      prevStat.map((userAdd) => ({
        ...userAdd,
        isDefault: userAdd.id === address.id,
      }));
    });

    await fetchUserAddress();
  };

  const handleCancelOrder = async (id) => {
    const toastId = toast.loading("Order cancel...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}order/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error occurred while cancel order.");
      }

      toast.success("Order canceled successfully.", { id: toastId });
    } catch (error) {
      toast.success("Error occurred while cancel order.", { id: toastId });
      throw new Error("Failed to cancel order.");
    }

    setUserOrders((prevStat) => prevStat.filter((order) => order.id !== id));
  };

  const handlePlaceOrder = async (order) => {
    setUserOrders((prevStat) => [...prevStat, order]);
    setProductCart([]);
    fetchAllOrders();
  };

  useEffect(() => {
    fetchAllOrders();
    fetchUserWishlist();
    fetchUserAddress();
    fetchUserCarts();
  }, []);

  return (
    <EcommerceContext.Provider
      value={{
        error,
        setError,

        isLoadingAddress,
        isLoadingOrders,
        isLoadingWishlist,
        isLoadingCart,
        searchText,
        fetchUserCarts,
        setSearchText,
        handleAddToCart,
        productCart,
        wishlist,
        address,
        userOrders,
        fetchUserAddress,
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
        handlePlaceOrder,
        handleCancelOrder,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
export default EcommerceProvider;
