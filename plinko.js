import crypto from 'crypto';

// replace with the values from the round you want to verify
const SERVER_SEED = '298926e4520901292dc81f6c2f90ad8e9f5678291521352102f154963a8ebdf3';
const SERVER_SEED_HASHED = 'a422fb327ca8297c0e29864431d2be2111cd1d24ab78e0765804b76f2ba330ca';
const CLIENT_SEED = 'df0a9c1a1349a4fda66fbb9be9aefe2vvvvvxy';
const NONCE = 4815;
const NUM_ROWS = 16;

const concatenated_seed = SERVER_SEED + '-' + CLIENT_SEED + '-' + NONCE + '';

const hash = crypto.createHash('sha256').update(concatenated_seed).digest('hex');
const checkedServerSeed = crypto.createHash('sha256').update(SERVER_SEED).digest('hex');

const path = [];

const decisions = Array.from(hash, (char) => parseInt(char, 16) % 2);
for (let i = 0; i < NUM_ROWS; i++) {
    const random = decisions[i];
    path.push(random);
}

if (SERVER_SEED_HASHED === checkedServerSeed) {
    console.log('\x1b[32m%s\x1b[0m', 'Server seed is correct');
} else {
    console.log('\x1b[31m%s\x1b[0m', 'Server seed is incorrect');
}

console.log('Path:', path);