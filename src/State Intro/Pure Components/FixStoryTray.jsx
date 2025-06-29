function StoryTray({ stories }) {
    stories.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>{story.label}</li>
      ))}
    </ul>
  );
}

// Solution.
function UpdatedStoryTray({ stories }) {
    return (
        <ul>
        {stories.map(story => (<li key={story.id}>{story.label}</li>))}
      <li>Create Story</li>
    </ul>
  );
}
export { StoryTray };