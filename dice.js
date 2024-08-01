import crypto from 'crypto';

// replace with the values from the round you want to verify
const SERVER_SEED = '918016bbb39610a13a5c4e55a4dd2c05c9c3f5715f4a380e70fa8e353f832a64';
const SERVER_SEED_HASHED = '9594e63e99cddcffeec23f7b8f06ae1821effafaf221040c067e6638e66448c1';
const CLIENT_SEED = 'df0a9c1a1349a4fda66fbb9be9aefe2vvvvvxy';
const NONCE = 664;

const concatenated_seed = SERVER_SEED + '-' + CLIENT_SEED + '-' + NONCE + '';

const hash = crypto.createHash('sha256').update(concatenated_seed).digest('hex');
const checkedServerSeed = crypto.createHash('sha256').update(SERVER_SEED).digest('hex');
const ticket = parseInt(hash.slice(0, 8), 16) % 10000000 / 100000;

if (SERVER_SEED_HASHED === checkedServerSeed) {
    console.log('\x1b[32m%s\x1b[0m', 'Server seed is correct');
} else {
    console.log('\x1b[31m%s\x1b[0m', 'Server seed is incorrect');
}

console.log('Ticket:', ticket);