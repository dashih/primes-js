function isPrime(n) {
    for (let i = 2n; i < n; i++) {
        if (n % i === 0n) {
            return false;
        }
    }

    return true;
}

onmessage = e => {
    for (let i = e.data[0]; i < e.data[1]; i++) {
        if (isPrime(i)) {
            postMessage([i, false]);
        }

        postMessage([undefined, false]);
    }

    postMessage([undefined, true]);
};
