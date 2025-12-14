import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

import { AccordionTwo } from './accordion';

describe('Implemtation detail free testing', () => {
    it('can open accordion items to see the contents', () => {
        const hats = { title: 'Favorite Hats', contents: 'Fedoras are classy' };
        const footware = { title: 'Favorite Footware', contents: 'Flipflops are the best', };

        render(<AccordionTwo items={[hats, footware]} />);
        expect(screen.getByText(hats.contents)).toBeInTheDocument();
        expect(screen.queryByText(footware.contents)).not.toBeInTheDocument();

        userEvent.click(screen.getByText(footware.title));
        expect(screen.getByText(footware.contents)).toBeInTheDocument();
    	expect(screen.queryByText(hats.contents)).not.toBeInTheDocument();
    });
});