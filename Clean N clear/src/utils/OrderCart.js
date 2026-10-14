
export const ORDER_CART_KEY = "cnc_order_cart";

export const getOrderCart = () => {
  try {
    const savedCart = localStorage.getItem(ORDER_CART_KEY);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.map((item) => ({
      ...item,
      quantity: Math.max(1, Number(item.quantity) || 1),
    }));
  } catch (error) {
    console.error("Unable to read cart:", error);
    return [];
  }
};

export const saveOrderCart = (cart) => {
  try {
    const safeCart = Array.isArray(cart) ? cart : [];
    localStorage.setItem(ORDER_CART_KEY, JSON.stringify(safeCart));
    return safeCart;
  } catch (error) {
    console.error("Unable to save cart:", error);
    return [];
  }
};

export const getOrderCount = (cart = getOrderCart()) => {
  if (!Array.isArray(cart)) return 0;

  return cart.reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 0),
    0
  );
};

export const updateOrderCart = (cart) => {
  const safeCart = saveOrderCart(cart);
  const count = getOrderCount(safeCart);

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cnc-order-count-updated", {
        detail: { count },
      })
    );

    window.dispatchEvent(new Event("cnc-order-cart-updated"));
  }

  return safeCart;
};

export const clearOrderCart = () => updateOrderCart([]);
