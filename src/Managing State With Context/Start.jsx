import { useState, createContext } from "react";
import Header from "./Header";
import ProductDetail from "./ProductDetail";

const ShopContext = createContext({
    products: [],
    cartItems: [],
    addToCart: () => {},
});

function Application() {
    const [cartItems, setCartItems] = useState([/* List of Items in Cart */]);
    const products = [/* some custom hook that fetches products and returns the fetched products */];

    const addToCart = (product) => { 
        /*add to cart logic (this adds to cartItems)  */
        /* Supress linter shouts */ typeof product, typeof setCartItems;
    };

    return (
        /* We are going to pass the things that we want to inject to these components using the value prop */
        /* This value prop will overwrite the default value */
        <ShopContext value={{ products, cartItems, addToCart }} >
            <Header />
            <ProductDetail />
        </ShopContext>
    )
}

export { ShopContext, Application };