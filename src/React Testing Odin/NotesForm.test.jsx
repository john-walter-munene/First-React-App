import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { userEvent } from '@testing-library/user-event';

import { NoteForm } from "./NotesForm";

describe('Testing a form in React', () => {
    it('<NoteForm /> updates parent state and calls onSubmit', async () => {
        const user = userEvent.setup();
        const createNote = vi.fn();

        render(<NoteForm createNote={createNote} />);

        const input = screen.getByRole('textbox');
        const sendButton = screen.getByText('save');

        await user.type(input, 'testing a form...');
        await user.click(sendButton);

        expect(createNote.mock.calls).toHaveLength(1);
        expect(createNote.mock.calls[0][0].content).toBe('testing a form...');
        console.log(createNote.mock.calls); // Log statements work as expected in tests.
    });
});