export const ORDER_CART_KEY = "cnc_order_cart";

export const getOrderCart = () => {
  try {
    const savedCart = localStorage.getItem(ORDER_CART_KEY);

    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Unable to read order cart:", error);
    return [];
  }
};

export const saveOrderCart = (cart) => {
  try {
    const safeCart = Array.isArray(cart) ? cart : [];

    localStorage.setItem(
      ORDER_CART_KEY,
      JSON.stringify(safeCart)
    );
  } catch (error) {
    console.error("Unable to save order cart:", error);
  }
};

export const getOrderCount = (cart = getOrderCart()) => {
  if (!Array.isArray(cart)) return 0;

  return cart.reduce(
    (total, item) => total + Number(item?.quantity || 0),
    0
  );
};

export const updateOrderCart = (cart) => {
  const safeCart = Array.isArray(cart) ? cart : [];

  saveOrderCart(safeCart);

  const count = getOrderCount(safeCart);

  window.dispatchEvent(
    new CustomEvent("cnc-order-count-updated", {
      detail: { count },
    })
  );

  return safeCart;
};

export const clearOrderCart = () => {
  updateOrderCart([]);
};