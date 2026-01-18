export const isValid = (cartItems) => {
  if (cartItems.length === 0) return false;

  const firstRestaurantId = cartItems[0].food?.restaurant.id;

  // Check if all items belong to the same restaurant
  const allSameRestaurant = cartItems.every(
    (item) => item.food?.restaurant.id === firstRestaurantId
  );

  return allSameRestaurant;
};
