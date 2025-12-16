import { render, screen, waitForElementToBeRemoved, } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import { it, describe, expect, vi } from 'vitest'
import { App, Input } from './App';

// Grouping Tests in a suite
window.fetch = vi.fn(() => {
  const user = { name: 'Jack', email: 'jack@email.com' };

  return Promise.resolve({
    json: () => Promise.resolve(user),
  });
});

describe('Testing App Component', () => {
  it('loading text is shown while API request is in progress', async () => {
    render(<App />);
    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  });

  it("user's name is rendered", async () => {
    render(<App />);
    const userName = await screen.findByText('Jack');
    expect(userName).toBeInTheDocument();
  });

  it('error message is shown', async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ message: 'API is down' });
    });

    render(<App />);

    const errorMessage = await screen.findByText('API is down');
    expect(errorMessage).toBeInTheDocument();
  });
});

// Simulating User Interactions
describe('Testing App Component', () => {
  it('counter is incremented on increment button click', () => {
    render(<App />);

    const counter = screen.getByTestId('counter');
    const incrementBtn = screen.getByText('Increment');

    userEvent.click(incrementBtn);
    userEvent.click(incrementBtn);

    expect(counter.textContent).toEqual('2');
  });

  it('counter is decremented on decrement button click', () => {
    render(<App />);

    const counter = screen.getByTestId('counter');
    const decrementBtn = screen.getByText('Decrement');

    userEvent.click(decrementBtn);

    expect(counter.textContent).toEqual('-2');
  });
});

// Testing callbacks.
it('input value is updated correctly', () => {
  render(<App />);

  const input = screen.getByRole('textbox');
  userEvent.type(input, 'React');

  expect(input.value).toBe('React');
});

it('call the callback every time input value is changed', () => {
  const handleChange = vi.fn();

  render(<Input handleChange={handleChange} inputValue="" />);

  const input = screen.getByRole('textbox');
  userEvent.type(input, 'React');

  expect(handleChange).toHaveBeenCalledTimes(5);
});