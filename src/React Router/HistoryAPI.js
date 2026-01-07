// Sample fetch

document.addEventListener("click", async (event) => {
  const creature = event.target.getAttribute("data-creature");
  if (creature) {
    // Prevent a new page from loading
    event.preventDefault();
    try {
      // Fetch new content
      const response = await fetch(`creatures/${creature}.json`);
      const result = await response.json();
      // Update the page with the new content
      displayContent(result);
    } catch (err) {
      console.error(err);
    }
  }
});

// JSON format example
{
  "description": "Bald eagles are not actually bald.",
  "image": {
    "src": "images/eagle.jpg",
    "alt": "A bald eagle"
  },
  "name": "Eagle"
}

// Dipslay
// Update the page with the new content
function displayContent(content) {
  document.title = `Creatures: ${content.name}`;

  const description = document.querySelector("#description");
  description.textContent = content.description;

  const photo = document.querySelector("#photo");
  photo.setAttribute("src", content.image.src);
  photo.setAttribute("alt", content.image.alt);
}

// Using pushState()

document.addEventListener("click", async (event) => {
  const creature = event.target.getAttribute("data-creature");
  if (creature) {
    event.preventDefault();
    try {
      const response = await fetch(`creatures/${creature}.json`);
      const result = await response.json();
      displayContent(result);
      // Add a new entry to the history.
      // This simulates loading a new page.
      history.pushState(result, "", creature);
    } catch (err) {
      console.error(err);
    }
  }
});

// Using the popstate event

// Handle forward/back buttons
window.addEventListener("popstate", (event) => {
  // If a state has been provided, we have a "simulated" page
  // and we update the current page.
  if (event.state) {
    // Simulate the loading of the previous page
    displayContent(event.state);
  }
});

// Using replaceState()

// Create state on page load and replace the current history with it
const image = document.querySelector("#photo");
const initialState = {
  description: document.querySelector("#description").textContent,
  image: {
    src: image.getAttribute("src"),
    alt: image.getAttribute("alt"),
  },
  name: "Home",
};
history.replaceState(initialState, "", document.location.href);