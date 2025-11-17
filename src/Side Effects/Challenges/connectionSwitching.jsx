import { useState, useEffect } from "react";

// Chat connections: encrypted and unencrypted.
function createEncryptedConnection(roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ 🔐 Connecting to "' + roomId + '... (encrypted)');
    },
    disconnect() {
      console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
    }
  };
}

function createUnencryptedConnection(roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '... (unencrypted)');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
    }
  };
}

// Chat room resources
function ChatRoom({ roomId, createConnection }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, createConnection]); // added the create connection prop (function) to the dependency array.

  return <h1>Welcome to the {roomId} room!</h1>;
}

// Application file.

function App() {
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);

  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>

      <label>
        <input type="checkbox" checked={isEncrypted} onChange={e => setIsEncrypted(e.target.checked)} />
        Enable encryption
      </label>
      <hr />

      <ChatRoom roomId={roomId}  
            createConnection={isEncrypted ? createEncryptedConnection :createUnencryptedConnection}/>
    </>
  );
}

export { App };

// Best solution, pass the is ecrypted down, and make computations from it.
function UpdatedChatRoom({ roomId, isEncrypted }) {
    useEffect(() => {
        const createConnection = isEncrypted ? createEncryptedConnection : createUnencryptedConnection;
        const connection = createConnection(roomId);
        connection.connect();

        return () => connection.disconnect();
    }, [roomId, isEncrypted]);

    return (<h1>Welcome to the {roomId} room!</h1>);
}

function UpdatedApp() {
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        Enable encryption
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        isEncrypted={isEncrypted}
      />
    </>
  );
}

export { UpdatedApp };