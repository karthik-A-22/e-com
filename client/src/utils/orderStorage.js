export const saveOrder = (order) => {
  const existing = JSON.parse(localStorage.getItem("orders") || "[]");
  existing.push(order);
  localStorage.setItem("orders", JSON.stringify(existing));
};

export const getOrders = () => {
  return JSON.parse(localStorage.getItem("orders") || "[]");
};
