import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { userEvent } from '@testing-library/user-event';

import { Note, NoteTwo } from "./NotesApp";

describe('Note component workss', () => {
    it('renders content', () => {
        const note = {
            content: 'Component testing is done with react-testing library',
            important: true,
        };

        render(<Note note={note} />);

        const element = screen.getByText('Component testing is done with react-testing library');
        expect(element).toBeInTheDocument();
        expect(element).toBeDefined();
    });

    it('renders content, though inside other content', () => {
        const note = {
            content: 'Does not work anymore :(',
            important: true
        };

        render(<NoteTwo note={note} />);

        // Failing suite note.
        // const element = screen.getByText('Does not work anymore :(');
        // expect(element).toBeDefined() Fails the tests. One error suite doesnt proceed

        // Alternatives.

        // Catch error on being thrown by using an arrow function
        expect(() => screen.getByText('Does not work anymore')).toThrowError(); 

        // Use an object that flags a section of the text, as in not exact.
        const element = screen.getByText('Does not work anymore :(', { exact: false });
        expect(element).toBeDefined();
        expect(element).toBeInTheDocument();

        // or use the findByText command, see next test as its async await
    });

    it('renders content asynchronously (practice findByText)', async () => {
        const note = {
            content: 'Does not work anymore :(',
            important: true
        };

        render(<NoteTwo note={note} />);

        const elementTwo = await screen.findByText('Does not work anymore', { exact: false });
        expect(elementTwo).toBeInTheDocument();
    });

    it('does not render this', () => {
        const note = { content: 'This is a reminder', important: true };

        
        render(<Note note={note} />);

        const element = screen.queryByText('do not want this thing to be rendered');
        expect(element).toBeFalsy();
        expect(element).toBeNull();
        expect(element).not.toBeTruthy();
    });
});

// Other methods include: getByTestId
// To use CSS selectors: querySelector, the container

describe('Testing Note using other methods', () => {
    it('renders content', () => {
        const note = {
            content: 'Component testing is done with react-testing-library',
            important: true
        };

        const { container } = render(<Note note={note} />);
        const div = container.querySelector('.note');
        expect(div.textContent).toMatch(note.content);
        expect(div).toHaveTextContent('Component testing is done with react-testing-library');
        
        // Debugging tests
        screen.debug(); // logs entire rendered component
        screen.debug(div); // logs a section of the component on etxraction
    });
});

describe('Button works correctly', () => {
    it('clicking the button calls the event handler once', async () => {
        const note = { content: 'Component testing is done with react-testing-library', important: true };
        const mockHandler = vi.fn()

        render(<Note note={note} toggleImportance={mockHandler} />);
        const user = userEvent.setup();
        const button = screen.getByText('make note important');
        await user.click(button);
        expect(mockHandler.mock.calls).toHaveLength(1);
        
    });
});