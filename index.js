const chunkSize = 1024n;
var current = 10000000n;
var largestPrime = 2n;
var numProcessed = 0n;

function assignWork(worker) {
    worker.postMessage([current, current + chunkSize]);
    current += chunkSize;
}

document.getElementById('startButton').onclick = () => {
    document.getElementById('startButton').disabled = true;
    document.getElementById('numWorkers').disabled = true;
    if (window.Worker) {
        const numWorkers = document.getElementById('numWorkers').value;
        for (i = 0; i < numWorkers; i++) {
            const worker = new Worker('worker.js');
            worker.onmessage = e => {
                const newPrime = e.data[0];
                const isDone = e.data[1];
                if (isDone) {
                    assignWork(worker);
                } else {
                    if (newPrime != undefined && newPrime > largestPrime) {
                        largestPrime = newPrime;
                    }

                    numProcessed++;
                }
            };

            assignWork(worker);
        }

        setInterval(() => {
            document.getElementById('largestPrime').innerText = `Largest prime: ${largestPrime.toLocaleString()}`;
            document.getElementById('numProcessed').innerText = `Processed: ${numProcessed.toLocaleString()}`;
        }, 1000);
    } else {
        alert('Web Workers unavailable!');
    }
};
