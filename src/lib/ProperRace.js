export const properRace = (promises) => {
    // There is no way to know which promise is rejected.
    // So we map it to a new promise to return the index when it fails
    let indexPromises = promises.map((p, index) => p.catch(() => {
        throw index;
    }));

    return Promise.race(indexPromises).catch(index => {
        // The promise has rejected, remove it from the list of promises and just continue the race.
        let p = promises.splice(index, 1)[0];
        p.catch(() => undefined);
        return properRace(promises);
    });
};