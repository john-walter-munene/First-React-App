import { useEffect, useState } from "react";

const Component = () => {
  const [data, setData] = useState();

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          'https://run.mocky.io/v3/d6155d63-938f-484c-8d87-6f918f126cd4',
        )
      ).json();

      // set state when the data received
      setData(data);
    };

    dataFetch();
  }, []);

  return <>{data}</>;
};

export { Component };

export const useData = (url) => {
  const [state, setState] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url)).json();

      setState(data);
    };

    dataFetch();
  }, [url]);

  return { data: state };
};

// Waterfall requests
const App = () => {
  // fetch is triggered in useEffect there, as normal
  const { data } = useData('/get-sidebar');

  // show loading state while waiting for the data
  if (!data) return 'loading';

  return (
    <>
      <Sidebar data={data} />
      <Issue />
    </>
  );
};
const Sidebar = ({ data }) => {
  return <>{data}</>
};

const Issue = () => {
  // fetch is triggered in useEffect there, as normal
  const { data } = useData('/get-issue');

  // show loading state while waiting for the data
  if (!data) return 'loading';

  // render actual issue now that the data is here!
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <Comments />
    </div>
  );
};

const Comments = () => {
  // fetch is triggered in useEffect there, as normal
  const { data } = useData('/get-comments');

  // show loading state while waiting for the data
  if (!data) return 'loading';

  // rendering comments now that we have access to them!
  return data.map((comment) => <div>{comment.title}</div>);
};

// Resolvable by
const useAllData = () => {
  const [sidebar, setSidebar] = useState();
  const [comments, setComments] = useState();
  const [issue, setIssue] = useState();

  const [sidebarUrl, issueUrl, commentsUrl] = ['/get-sidebar', '/get-issue', '/get-comments'];

  useEffect(() => {
    const dataFetch = async () => {
      // waiting for allthethings in parallel
      const result = (
        await Promise.all([
          fetch(sidebarUrl),
          fetch(issueUrl),
          fetch(commentsUrl),
        ])
      ).map((r) => r.json());

      // and waiting a bit more - fetch API is cumbersome
      const [sidebarResult, issueResult, commentsResult] =
        await Promise.all(result);

      // when the data is ready, save it to state
      setSidebar(sidebarResult);
      setIssue(issueResult);
      setComments(commentsResult);
    };

    dataFetch();
  }, []);

  return { sidebar, comments, issue };
};

const AppTwo = () => {
  // all the fetches were triggered in parallel
  const { sidebar, comments, issue } = useAllData();

  // show loading state while waiting for all the data
  if (!sidebar || !comments || !issue) return 'loading';

  // render the actual app here and pass data from state to children
  return (
    <>
      <Sidebar data={sidebar} />
      <Issue comments={comments} issue={issue} />
    </>
  );
};

export { AppTwo }