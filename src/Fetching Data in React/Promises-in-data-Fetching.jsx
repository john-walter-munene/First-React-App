console.log('first step'); // will log FIRST

fetch('/some-url') // create promise here
  .then(() => {
    // wait for Promise to be done
    // log stuff after the promise is done
    console.log('second step'); // will log THIRD (if successful)
  })
  .catch(() => {
    console.log('something bad happened'); // will log THIRD (if error happens)
  });

console.log('third step'); // will log SECOND



const App = () => {
  const [page, setPage] = useState("1");

  return (
    <div>
      {/* <!-- left column buttons --> */}
      <button onClick={() => setPage("1")}>Issue 1</button>
      <button onClick={() => setPage("2")}>Issue 2</button>

      {/* <!-- the actual content --> */}
      <Page id={page} />
    </div>
  );
};

const Page = ({ id }: { id: string }) => {
  const [data, setData] = useState({});

  // pass id to fetch relevant data
  const url = `/some-url/${id}`;

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        // save data from fetch request to state
        setData(r);
      });
  }, [url]);

  // render data
  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </>
  );
};

// Fixing race conditions: force re-mounting

const AppTwoo = () => {
  const [page, setPage] = useState('issue');

  return (
    <>
      {page === 'issue' && <Issue />}
      {page === 'about' && <About />}
    </>
  );
};

const About = () => {
  const [about, setAbout] = useState();

  useEffect(() => {
    fetch("/some-url-for-about-page")
      .then((r) => r.json())
      .then((r) => setAbout(r));
  }, []);
  ...
}

// Fixing race conditions: drop incorrect result

const PageTwo = ({ id }) => {
  // create ref
  const ref = useRef(id);

  useEffect(() => {
    // update ref value with the latest id
    ref.current = id;

    fetch(`/some-data-url/${id}`)
      .then((r) => r.json())
      .then((r) => {
        // compare the latest id with the result
        // only update state if the result actually belongs to that id
        if (ref.current === r.id) {
          setData(r);
        }
      });
  }, [id]);
};

const PageTwoAlt = ({ id }) => {
  // create ref
  const ref = useRef(id);

  useEffect(() => {
    // update ref value with the latest url
    ref.current = url;

    fetch(`/some-data-url/${id}`).then((result) => {
      // compare the latest url with the result's url
      // only update state if the result actually belongs to that url
      if (result.url === ref.current) {
        result.json().then((r) => {
          setData(r);
        });
      }
    });
  }, [url]);
};

// Fixing race conditions: drop all previous results
// normal useEffect
useEffect(() => {
  // "cleanup" function - function that is returned in useEffect
  return () => {
    // clean something up here
  };
  // dependency - useEffect will be triggered every time url has changed
}, [url]);

useEffect(() => {
  // local variable for useEffect's run
  let isActive = true;

  // do fetch here

  return () => {
    // local variable from above
    isActive = false;
  };
}, [url]);

useEffect(() => {
  // set this closure to "active"
  let isActive = true;

  fetch(`/some-data-url/${id}`)
    .then((r) => r.json())
    .then((r) => {
      // if the closure is active - update state
      if (isActive) {
        setData(r);
      }
    });

  return () => {
    // set this closure to not active before next re-render
    isActive = false;
  };
}, [id]);

// Fixing race conditions: cancel all previous requests
useEffect(() => {
  // create controller here
  const controller = new AbortController();

  // pass controller as signal to fetch
  fetch(url, { signal: controller.signal })
    .then((r) => r.json())
    .then((r) => {
      setData(r);
    });

  return () => {
    // abort the request here
    controller.abort();
  };
}, [url]);

// Handling promise rejections properly
fetch(url, { signal: controller.signal })
  .then((r) => r.json())
  .then((r) => {
    setData(r);
  })
  .catch((error) => {
    // error because of AbortController
    if (error.name === 'AbortError') {
      // do nothing
    } else {
      // do something, it's a real error!
    }
});