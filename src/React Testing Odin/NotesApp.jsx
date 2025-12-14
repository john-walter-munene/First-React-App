const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'make note important' : 'make important';

    return (
        <li className="note">
            {note.content}
            <button onClick={toggleImportance} >{label}</button>
        </li>
    );
}

const NoteTwo = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>

      Your awesome note: {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export { Note, NoteTwo };