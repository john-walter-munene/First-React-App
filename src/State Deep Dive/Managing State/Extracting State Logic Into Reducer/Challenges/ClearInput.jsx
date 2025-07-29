import { useState } from "react";
typeof useState //

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea value={message} placeholder={'Chat to ' + contact.name} 
        onChange={(e) => {
          dispatch({ type: 'edited_message', message: e.target.value, });
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}

// soln
function UpdatedChat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea value={message} placeholder={'Chat to ' + contact.name}
        onChange={(e) => {dispatch({ type: 'edited_message', message: e.target.value, });}}/>
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({ type: 'edited_message', message: '', });
          }}>Send to {contact.email}</button>
    </section>
  );
}

export { UpdatedChat };

// A better solution
// From user perspctive sending and editing are two different actions
const initialState = {
  selectedId: 0,
  message: 'Hello',
};

function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'sent_message': {
      return {
        ...state,
        message: '',
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export { messengerReducer, initialState}