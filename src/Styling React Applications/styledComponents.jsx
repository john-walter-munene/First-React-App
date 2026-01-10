import styled from "styled-components";

const StyledButton = styled.a`
  padding: 0.75em 1em;
  background-color: ${ ({ primary }) => ( primary ? "#07c" : "#333" ) };
  color: white;

  &:hover {
    background-color: #111;
  }
`;


function App() {
  return (
    <div className="App">
      ...
      <StyledButton href="...">Default Call-to-action</StyledButton>
      <StyledButton primary href="...">Primary Call-to-action</StyledButton>
    </div>
  );
}
export { App };