// npm i react-fetch-hook

import useFetch from 'react-fetch-hook';

const {
  isLoading: loading,
  data,
  error,
} = useFetch(
  `https://jsonplaceholder.typicode.com/posts/${postId}`
);