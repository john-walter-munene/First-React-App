// Using fetch in React components and handling errors

import { useEffect, useState } from "react";

// Image styles
const ImageStyles = {
        width: '500px',
        height: '500px',
        margin: '20px 50px',
};

const Image = () => {
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch("https://picsum.photos/v2/list", {
        headers: {
          "User-Agent": "the-odin-project"
        }
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((response) => setImageURL(response[0].download_url))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading... a representation for a spinner!</p>
    if (error) return <p>A network error was encountered</p>

    return (
        imageURL && (
            <>
                <h1>An Image</h1>
                <img src={imageURL} alt={"placeholder text"} style={ImageStyles} />
            </>
        )
    )
};

export { Image };

// using custom hooks.
// Extracting the above component into its own hook

const useImageURL = () => {
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch("https://picsum.photos/v2/list", {
        headers: {
          "User-Agent": "the-odin-project"
        }
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((response) => setImageURL(response[0].download_url))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    return { imageURL, error, loading };
}

const ImageTwo = () => {
    const { imageURL, error, loading } = useImageURL();

    if (loading) return <p>Loading... a representation for a spinner!</p>
    if (error) return <p>A network error was encountered</p>

    return (
        imageURL && (
            <>
                <h1>An Image</h1>
                <img src={imageURL} alt={"placeholder text"} style={ImageStyles} />
            </>
        )
    )    
}

export { ImageTwo }