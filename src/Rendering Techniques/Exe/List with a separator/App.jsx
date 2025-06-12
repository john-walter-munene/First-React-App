// List with a separator 

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>
        <p key={index}>
          {line}
        </p>
      )}
    </article>
  );
}


// Manual map
function UpdatedPoem() {
  let iterableLines = poem.lines;
  let updatedLines = [];

  for (let counter = 0; counter < iterableLines.length; counter++) {
    // Push the <p> line
    updatedLines.push(<p key={`line-${counter}`}>{iterableLines[counter]}</p>);

    // Push <hr /> after each line except the last
    if (counter < iterableLines.length - 1) {
      updatedLines.push(<hr key={`hr-${counter}`} />);
    }
  }

  return <article>{updatedLines}</article>;
}

// Using a fragment
function UpdatedPoemTwo() {
  let iterableLines = poem.lines;
  let updatedLines = [];

  for (let counter = 0; counter < iterableLines.length; counter++) {
    updatedLines.push(
      <React.Fragment key={counter}>
        <p>{iterableLines[counter]}</p>
        {counter < iterableLines.length - 1 && <hr />}
      </React.Fragment>
    );
  }

  return <article>{updatedLines}</article>;
}


export { Poem, UpdatedPoem, UpdatedPoemTwo };