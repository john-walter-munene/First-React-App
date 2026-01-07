import { Form, useLoaderData } from "react-router";

// A mock database of contacts
let contacts = [
  { id: 1, first: "John", last: "Doe", favorite: true },
  { id: 2, first: "Jane", last: "Smith", favorite: false },
  { id: 3, first: "Bob", last: "Johnson", favorite: true },
];

// contacts = new Array();

// Simulate fetching data asynchronously
async function getContacts() {
  // You can simulate a network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(contacts), 100); // 100ms delay
  });
}

// Optional: get a single contact by ID
async function getContact(id) {
  return new Promise((resolve) => {
    const contact = contacts.find((c) => c.id === Number(id));
    setTimeout(() => resolve(contact), 100);
  });
}

// Simulate creating a new contact
async function createContact() {
  return new Promise((resolve) => {
    // Generate a new contact with a unique ID
    const newContact = {
      id: contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
      first: "New",
      last: "Contact",
      favorite: false,
    };

    // Add it to the mock database
    contacts.push(newContact);

    // Simulate network delay
    setTimeout(() => resolve(newContact), 100);
  });
}

async function loader({ params }) {
  const contact = await getContact(params.contactId)
  return { contact };
}

function Contact() {
  const { contact } = useLoaderData();

   if (!contact) {
    return <p>No contact found</p>;
  }

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={ contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (<>{contact.first} {contact.last}</>) : (<i>No Name</i>)}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p><a target="_blank" href={`https://twitter.com/${contact.twitter}`}>{contact.twitter}</a></p>)}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit"><button type="submit">Edit</button></Form>
          <Form method="post" action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) event.preventDefault();
            }}><button type="submit">Delete</button></Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button name="favorite" value={favorite ? "false" : "true"}
        aria-label={ favorite ? "Remove from favorites" : "Add to favorites"}>{favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

export { Contact, loader, getContact, getContacts, createContact }