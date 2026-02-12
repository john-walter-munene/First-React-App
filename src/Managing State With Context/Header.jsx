import { useContext } from "react";
import { Link } from "react-router";
import { ShopContext } from "./Start";

function Links() {
    const { cartItems } = useContext(ShopContext);

    return (
        <ul>
            {/* Links here */}

            <li>
                <Link to="link to the cart" >
                    <span>Cart</span>
                    <div className="cart-icon">{cartItems.length}</div>
                </Link>
            </li>
        </ul>
    );
}

export default function Header() {
    return (
        <header>
            {/* Other head elements */}
            <nav><Links /></nav>
        </header>
    );
}