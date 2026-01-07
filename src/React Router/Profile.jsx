// import { Outlet } from "react-router";

import { useParams } from "react-router";
import { DefaultProfile, Spinach, Popeye } from "./Router";

// const Profile = () => {
//     return (
//         <div>
//             <h1>Hello from profile page!</h1>
//             <p>So, how are you?</p>

//             <hr />
//             <h2>The profile visited is here</h2>
//             <Outlet />
//         </div>
//     );
// }

const Profile = () => {
  const { name } = useParams();

  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The profile visited is here:</h2>
      {name === "popeye" ? (
        <Popeye />
      ) : name === "spinach" ? (
        <Spinach />
      ) : (
        <DefaultProfile />
      )}
    </div>
  );
};

export { Profile };