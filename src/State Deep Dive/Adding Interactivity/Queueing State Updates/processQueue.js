function getFinalState(baseState, queue) {
    let finalState = baseState;

    // TODO: do sth with the queue
    for (let update of queue) {
        if (typeof update === 'function') {
            finalState = update(finalState);
        } else {
            finalState = update;
        }
    }

    return finalState;
}

export { getFinalState };