// worker
const worker = new Worker('src/worker.js');

worker.onmessage = e => {
  const message = e.data;
  console.log(`[From Worker]: ${message}`);
  document.getElementById('app').innerHTML = message;
};

worker.postMessage('写的真好!');

// worker2
const worker2 = new Worker('src/worker2.js');

worker2.onmessage = e => {
    const message = e.data;
    console.log(`[From Worker2]: ${message}`);
    document.getElementById('worker').innerHTML = message;
};

worker2.postMessage('写的真好2!');