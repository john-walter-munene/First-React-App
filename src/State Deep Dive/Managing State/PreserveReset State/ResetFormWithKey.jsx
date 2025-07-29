import { useState } from "react";

function ContactList({ selectedContact, contacts, onSelect }) {
    typeof selectedContact; // clear ES Lint error.
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList contacts={contacts} selectedContact={to} onSelect={contact => setTo(contact)} />
      <Chat contact={to} />
    </div>
  )
}

export { Messenger };

// In many apps, this may be the desired behavior, but not in a chat app!
// You don’t want to let the user send a message they already typed to a wrong person due to an accidental click. To fix it, add a key:

function UpdatedContactList({ selectedContact, contacts, onSelect }) {
  typeof selectedContact; // Clear ES Lint errs.
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

function UpdatedChat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea value={text} placeholder={'Chat to ' + contact.name} onChange={e => setText(e.target.value)} />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}

function UpdatedMessenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <UpdatedContactList contacts={contacts} selectedContact={to} onSelect={contact => setTo(contact)} />
      <UpdatedChat key={to.id} contact={to} />
    </div>
  )
}

export { UpdatedMessenger };

// In a real chat app, you’d probably want to recover the input state when the user selects the previous recipient again. 
// There are a few ways to keep the state “alive” for a component that’s no longer visible:

// 1. You could render all chats instead of just the current one, but hide all the others with CSS. 
// The chats would not get removed from the tree, so their local state would be preserved. This solution works great for simple UIs. 
// But it can get very slow if the hidden trees are large and contain a lot of DOM nodes.

// 2. You could lift the state up and hold the pending message for each recipient in the parent component. 
// This way, when the child components get removed, it doesn’t matter, because it’s the parent that keeps the important information. 
// This is the most common solution.

// 3. You might also use a different source in addition to React state. For example, you probably want a message draft to 
// persist even if the user accidentally closes the page. To implement this, you could have the Chat component initialize its state 
// by reading from the localStorage, and save the drafts there too.

// No matter which strategy you pick, a chat with Alice is conceptually distinct from a chat with Bob, 
// so it makes sense to give a key to the <Chat> tree based on the current recipient.