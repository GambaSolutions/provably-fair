import crypto from 'crypto';
const PRECISION = 100000000;

// replace with the values from the round you want to verify
const SERVER_SEED = '865a6100502b0a7684ad62428a143ff990c22a84b12b11d988e26451bf29ea4a';
const SERVER_SEED_HASHED = 'c3e23776815f297ca7af39e8890758722d17103efe4d5e8064dc007c478ba54c';
const CLIENT_SEED = 'df0a9c1a1349a4fda66fbb9be9aefe25';
const OPENING_ID = 1;

const concatenated_seed = SERVER_SEED + '-' + CLIENT_SEED + '-' + OPENING_ID + '';

const hash = crypto.createHash('sha256').update(concatenated_seed).digest('hex');
const checkedServerSeed = crypto.createHash('sha256').update(SERVER_SEED).digest('hex');
const ticket = parseInt(hash.substr(0,8), 16) % PRECISION;

if (SERVER_SEED_HASHED === checkedServerSeed) {
    console.log('\x1b[32m%s\x1b[0m', 'Server seed is correct');
} else {
    console.log('\x1b[31m%s\x1b[0m', 'Server seed is incorrect');
}

console.log('Ticket:', ticket / PRECISION);