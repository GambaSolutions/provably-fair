import crypto from 'crypto';
const CRASH_EDGE = 0.1;

// replace with the values from the round you want to verify
const SERVER_SEED = '8543937f454738326d583740ca10a1283dbb25eb22a232f6ab122a35c4604296';
const CLIENT_SEED = 'a24d70e28d333628c86be397442643fb';
const NONCE = 297;

const generateCrashPoint = (serverSeed, clientSeed, gameId) => {
    const concatenatedHash = serverSeed + '-' + clientSeed + '-' + gameId;

    const hash = crypto.createHmac('sha256', concatenatedHash).digest('hex');

    const a = parseInt(hash.substring(0, 13), 16);
    const b = Math.pow(2, 52);

    const result = (100 * b - a) / (b - a);

    const edge = 1 - CRASH_EDGE;

    const crashPoint = Math.max(100, result * edge) / 100;

    return parseFloat(crashPoint.toFixed(2));
};

console.log('Crash point:', generateCrashPoint(SERVER_SEED, CLIENT_SEED, NONCE));