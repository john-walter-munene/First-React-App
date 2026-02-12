import { useState } from "react";
// other imports for Header and ProductDetail

export default function App() {
  const [cartItems, setCartItems] = useState([/* List of Items in Cart */]);

  const products = [/* some custom hook that fetches products and returns the fetched products */];

  const addToCart = (product) => { 
        /*add to cart logic (this adds to cartItems)  */
        /* Supress linter shouts */ typeof product, typeof setCartItems;
    };

  return (
    <>
      <Header cartItemsCount={cartItems.length} />
      <ProductDetail addToCart={addToCart} products={products} />
    </>
  );
}
