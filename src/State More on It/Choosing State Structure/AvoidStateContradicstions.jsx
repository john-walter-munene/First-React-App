import { useState } from "react";

function FeedbackForm() {
    const [text, setText] = useState('');
    const [isending, setIsending] = useState(false);
    const [isSent] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsending(true);
        await sendMessage(text);
        setIsending(false);
        setText(true)
    }

    if (isSent) return ( <h1>Thanks for feedback</h1> );

    return (
        <form onSubmit={handleSubmit}>
            <p>How was your stay at my place?</p>
            <textarea disabled={isending} value={text} onChange={(event) => setText(event.target.value)}></textarea>
            <br />
            <button disabled={isending} type="submit">Send</button>
            {isending && <p>Sending</p>}
        </form>
    );
}

async function sendMessage(text) {
    //...
    console.log(`Sending "${text}" over the network`);
}

// Avoid introducing possible states like in above code.
// Potentially we could have both isSending and isSent as true.
// Fix above problem by using a single state variable
function UpdatedFeedbackForm() {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('typing');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('sending');
        await sendMessage(text);
        setStatus('sent');
    }

    const isSending = status === 'sending';
    const isSent = status === 'sent';

    if (isSent) return ( <h1>Thanks for feedback</h1> );

    return (
        <form onSubmit={handleSubmit}>
            <p>How was your stay with walter</p>
            <textarea disabled={isSending} value={text} onChange={(event) => setText(event.target.value)}></textarea>
            <br />
            <button disabled={isSending} type="submit">Send</button>
        </form>
    );
}

export { FeedbackForm, UpdatedFeedbackForm };