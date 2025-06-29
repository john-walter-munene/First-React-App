import { useState } from "react";

function Dashboard() {
    const [authModalIsOpen, setAutheModalIsOpen ] = useState(false);

    console.log(setAutheModalIsOpen);

    // More functionality here.

    return authModalIsOpen ? <AuthModal /> : <Mainpage />
}

export { Dashboard };