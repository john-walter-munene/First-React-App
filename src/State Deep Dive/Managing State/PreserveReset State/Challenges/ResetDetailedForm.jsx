import { useState } from "react";
import { EditContact } from "./EditContact";
import { ContactList } from "./ContactList";

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

function ContactManager() {
  const [contacts, setContacts ] = useState(initialContacts);
  const [selectedId, setSelectedId] = useState(0);
  const selectedContact = contacts.find(contact =>contact.id === selectedId);

  function handleSave(updatedData) {
    const nextContacts = contacts.map(contact => {
      if (contact.id === updatedData.id) return updatedData;
      else return contact;
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList contacts={contacts} selectedId={selectedId} onSelect={id => setSelectedId(id)} />
      <hr />
      <EditContact key={selectedId} initialData={selectedContact} onSave={handleSave} />
    </div>
  )
}

export { ContactManager };