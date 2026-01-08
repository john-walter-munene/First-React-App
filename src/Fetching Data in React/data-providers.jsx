import { createContext } from "react";

const CommentsDataProvider = ({ children }) => {
  const [comments, setComments] = useState();

  useEffect(async () => {
    fetch('/get-comments')
      .then((data) => data.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <Context.Provider value={comments}>
      {children}
    </Context.Provider>
  );
};

const useComments = () => useContext(Context);

const App = () => {
  const sidebar = useSidebar();
  const issue = useIssue();

  // show loading state while waiting for sidebar
  if (!sidebar) return 'loading';

  // no more props drilling for any of those
  return (
    <>
      <Sidebar />
      {issue ? (<Issue />) : ('loading')}
    </>
  );
}

export { CommentsDataProvider, useComments, App };

export const VeryRootApp = () => {
  return (
    <SidebarDataProvider>
      <IssueDataProvider>
        <CommentsDataProvider>
          <App />
        </CommentsDataProvider>
      </IssueDataProvider>
    </SidebarDataProvider>
  );
};