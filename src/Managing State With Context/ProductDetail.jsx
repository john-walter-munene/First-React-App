import { useContext } from "react";
import { ShopContext } from "./Start";

export default function ProductDetail() {
  const { products, addToCart } = useContext(ShopContext);
  const product = products.find(/* Logic to find the specific product */);

  return (
    <div>
      {/* Image of the product */}
      <div>
        {/* elements that align with the design */}
        <button type="button" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}