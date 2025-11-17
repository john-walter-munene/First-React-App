import { useState, useMemo, useEffect } from "react";

// How to remove unnecessary Effects.

// Updating state based on props or state changes

function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}

// A better approach would be to:
// Remove unnecesarry state variables
// Remove the effect here

function UpdatedForm() {
    const [firstName, setFirstName] = useState('John Walter');
    const [lastName, setLastName] = useState('Munene Njeru');

    // ✅ Good: calculated during rendering
    const fullName = `${firstName} ${lastName}`;
    // ...
}

export { Form, UpdatedForm };

// Caching expensive calculations

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [visibleTodos, setVisibleTodos] = useState([]);

  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}

function UpdatedTodoList() {
    const [newTodo, setNewTodo] = useState('');

    // ✅ This is fine if getFilteredTodos() is not slow.
    const visibleTodos = getFilteredTodos(todos, filter);
    // ...
}

// Above case is fine if the filter is not slow, or you don't have many todos to handle.
// Wrap the filtered items in (useMemo) for the expensive calculation: Memoization.
function SuperTodoList() {
    const [newTodo, setNewTodo] = useState('');

    const visibleTodos = useMemo(() => {
        // ✅ Does not re-run unless todos or filter change
        return getFilteredTodos(todos, filter);
    }, [todos, filter]);
}

// In a one liner.
function SupremeTodoList() {
    const [newTodo, setNewTodo] = useState('');

    // ✅ Does not re-run getFilteredTodos() unless todos or filter change
    const visibleTodos = useMemo(() => getFilteredTodos(todos,  filter), [todos, filter]);
    // ...
}

export { TodoList, UpdatedTodoList, SuperTodoList, SupremeTodoList };

// How to tell if a claculation is expensive.
console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');

// If time is greater than 1ms, experiment with a memoization.
console.time('filter array');
const visibleTodosTwo = useMemo(() => {
  return getFilteredTodos(todos, filter); // Skipped if todos and filter haven't changed
}, [todos, filter]);
console.timeEnd('filter array');

// Resetting all state when a prop changes

function ProfilePage({ userId }) {
    const [comment, setComment] = useState('');

    // 🔴 Avoid: Resetting state on prop change in an Effect
    useEffect(() => setComment(''), [userId]);
    // ...
}

// Instead, tell React each profile is conceptually different using explicit keys.
function UpdatedProfilePage({ userId }) {
    return (<Profile userId={userId} key={userId} />);
}

function Profile({ userId }) {
    // ✅ This and any other state below will reset on key change automatically
    const [comment, setComment] = useState('');
    // ...
}

export { ProfilePage, UpdatedProfilePage };

// Adjusting some state when a prop changes 
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 Avoid: Adjusting state on prop change in an Effect
  useEffect(() => {
    setSelection(null);
  }, [items]);
  // ...
}

// Every time above, if items change, components render with stale selection
// The React will update DOM, then run effects, and a final rerender from setSeelection
// Instead, it would be best to update state during the rendering process.

function UpdatedList({ items }) {
    const [isReverse, setIsReverse] = useState(false);
    const [selection, setSelection] = useState(null);

    // Better: Adjust the state while rendering
    const [prevItems, setPrevItems] = useState(items);
    if (items !== prevItems) {
        setPrevItems(items);
        setSelection(null);
    }

    // ...
}

// Best practice: Instead of updating state during a render
// Store selected Items ID:
function SuperList({ items }) {
    const [isReverse, setIsReverse] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // ✅ Best: Calculate everything during rendering
    const selection = items.find(item => item.id === selectedId ?? null);
    // ...
}

// Sharing logic between event handlers
function ProductPage({ product, addToCart }) {
  // 🔴 Avoid: Event-specific logic inside an Effect
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name} to the shopping cart!`);
    }
  }, [product]);

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
  }
  // ...
}

function UpdatedProductPage({ product, addToCart }) {
    // ✅ Good: Event-specific logic is called from event handlers
    function buyProduct() {
        addToCart(product);
        showNotification(`Added ${product.name} to the shopping cart!`);
    }

    function handleBuyClick() {
        buyProduct();
    }

    function handleCheckoutClick() {
        buyProduct();
        navigateTo('/checkout');
    }
    // ...
}

// Sending a POST request
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic should run because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 Avoid: Event-specific logic inside an Effect
  const [jsonToSubmit, setJsonToSubmit] = useState(null);
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}

// In above form, the post analytics is legical as it sends a request when the component loads.
// The submission logic ought to live in the event handlers.

function UpdatedForm() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic runs because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ Good: Event-specific logic is in the event handler
    post('/api/register', { firstName, lastName });
  }
  // ...
}

export { Form, UpdatedForm };

// Chains of computations
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1);
    }
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0);
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
  }, [round]);

  useEffect(() => {
    alert('Good game!');
  }, [isGameOver]);

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    } else {
      setCard(nextCard);
    }
  }

  // ...
}

// The best solution is to calculate what you can during rendering.
function UpdatedGame() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ Calculate what you can during rendering
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // ✅ Calculate all the next state in the event handler
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount < 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('Good game!');
        }
      }
    }
  }

  // ...
}

export { Game, UpdatedGame };

// Initializing the application
function App() {
  // 🔴 Avoid: Effects with logic that should only ever run once
  useEffect(() => {
    loadDataFromLocalStorage();
    checkAuthToken();
  }, []);
  // ...
}

// Add a top level variable to track the one time events.
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ Only runs once per app load
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}

// Alternatively run it during module initalization.
if (typeof window !== 'undefined') { // Check if we're running in the browser.
   // ✅ Only runs once per app load
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}

// Notifying parent components about state changes 
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 Avoid: The onChange handler runs too late
  useEffect(() => {
    onChange(isOn);
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }

  // ...
}

// Update both states using the event handler.
function UpdatedToggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) {
    // ✅ Good: Perform all updates during the event that caused them
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}

// ✅ Also good: the component is fully controlled by its parent
function UpdatedAltToggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  // ...
}


// Whenever you try to keep two different state variables synchronized, try lifting state up instead!
export { Toggle, UpdatedToggle, UpdatedAltToggle };

// Passing data to the parent

function Parent() {
  const [data, setData] = useState(null);
  // ...
  return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
  const data = useSomeAPI();
  // 🔴 Avoid: Passing data to the parent in an Effect
  useEffect(() => {
    if (data) {
      onFetched(data);
    }
  }, [onFetched, data]);
  // ...
}

function UpdatedParent() {
  const data = useSomeAPI();
  // ...
  // ✅ Good: Passing data down to the child
  return <UpdatedChild data={data} />;
}

function UpdatedChild({ data }) {
  // ...
}

export { Parent, UpdatedParent };

// Subscribing to an external store
function useOnlineStatus() {
  // Not ideal: Manual store subscription in an Effect
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);
  return isOnline;
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}

// Effects work, and it is common, but use useSyncExternalStore
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function UpdatedUseOnlineStatus() {
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client
    () => true // How to get the value on the server
  );
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}

// Fetching data
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴 Avoid: Fetching without cleanup logic
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

// Adding a clean up function to handle the race condition.
function UpdatedSearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

export { SearchResults, UpdatedSearchResults };

// Using a custom hook to fetch data.
function SearchResults({ query }) {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}

// Recap.
// If you can calculate something during render, you don’t need an Effect.
// To cache expensive calculations, add useMemo instead of useEffect.
// To reset the state of an entire component tree, pass a different key to it.
// To reset a particular bit of state in response to a prop change, set it during rendering.
// Code that runs because a component was displayed should be in Effects, the rest should be in events.
// If you need to update the state of several components, it’s better to do it during a single event.
// Whenever you try to synchronize state variables in different components, consider lifting state up.
// You can fetch data with Effects, but you need to implement cleanup to avoid race conditions.