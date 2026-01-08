import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

const FetchGetRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        let postsData = await getRequestWithNativeFetch(`https://jsonplaceholder.typicode.com/posts?_limit=8`);
        setData(postsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForPosts();
  }, []);

  return (
    <div className="flex">
      <div className="w-52 sm:w-80 flex justify-center items-center">
        {loading && (
          <div className="text-xl font-medium">Loading posts...</div>
        )}
        {error && <div className="text-red-700">{error}</div>}

        <ul>
          {data &&
            data.map(({ id, title }) => (
              <li
                key={id}
                className="border-b border-gray-100 text-sm sm:text-base"
              >
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses = 'p-4 block hover:bg-gray-100';
                    return isActive
                      ? `${baseClasses} bg-gray-100`
                      : baseClasses;
                  }}
                  to={`/posts/${id}`}
                >
                  {title}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-gray-100 flex-1 p-4 min-h-[550px]">
        Single post here...
      </div>
    </div>
  );
};

export default FetchGetRequest;

const getRequestWithNativeFetch = async (url, signal = null) => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json();
};
// Rendering a single post with fetch()

const RenderingASinglePost = () => {

    useEffect(() => {
  const controller = new AbortController();

  const fetchSinglePost = async () => {
    try {
      const postData = await getRequestWithNativeFetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`, controller.signal);
      // ...
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Aborted');
        return;
      }
      // ...
    } finally {}
  };

  fetchSinglePost();

  return () => controller.abort();
}, [postId]);
    return (
  <>
    {/* loading and error JSX here... */}
    <article>
      <h1 className="text-xl md:text-2xl font-medium mb-6">
        {data?.title}
      </h1>
      <p>{data?.body}</p>
    </article>
  </>
);
}

// Using the Fetch API for POST requests
/*
useEffect(() => {
  const fetchDataForPosts = async () => {
    try {
      const postsData = await postRequestWithFetch({
        userId: 11,
        id: 101,
        title: 'New post title',
        body: 'The post body content',
      });
      // update state variables like before
    } catch (err) {}
    finally {}
  };
  fetchDataForPosts();
}, []);

Then the post request...

    export const postRequestWithFetch = async (data) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};
*/