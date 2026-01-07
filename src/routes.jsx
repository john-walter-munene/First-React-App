// Refactoring the routes

import { Root, loader as rootLoader, action as rootAction } from "./React Router/root";
import { ErrorPage } from "./React Router/error-page";
import { Contact, loader as contactLoader }  from "./React Router/contacts";
import { EditContact } from "./React Router/edit";

const routes = [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      action: rootAction,
      children: [
        {
          path: "contacts/:contactId",
          element: <Contact />,
          loader: contactLoader,
        },
        {
          path: "contacts/:contactId/edit",
          element: <EditContact />,
          loader: contactLoader,
        }
      ],
    },
];

export { routes };