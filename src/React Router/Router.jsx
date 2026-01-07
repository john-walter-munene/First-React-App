// Nested routes, outlets and dynamic segments

import { Link } from "react-router";

const Popeye = () => {
    return (
        <>
            <p>Hi, I am Popeye! I love to eat Spinach!</p>
            <Link to="/">Click here to go back</Link>
        </>
    )
};

const Spinach = () => {
  return (
    <>
      <p>Hi, I am Spinach! Popeye loves to eat me!</p>
      <Link to="/">Click here to go back</Link>
    </>
  );
};

const DefaultProfile = () => {
  return <p>Oh, nothing to see here!</p>;
};

const ErrorPage = () => {
  return (
    <div>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export { Popeye, Spinach, DefaultProfile, ErrorPage };