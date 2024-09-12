import crypto from 'crypto';
const PRECISION = 100000000;

// replace with the values from the round you want to verify
const SERVER_SEED = '985c8730306f7abfdc2d8160cc40aa990c82a54f2b9ef90a0a98af26669c2747';
const CLIENT_SEEDS = [
    "df0a9c1a1349a4fda66fbb9be9aefe2vvvvvxy",
    "7b50e6d9e0c7e84449313b03aa0be303"
]
const NONCE = 11;

const concatenated_hash = SERVER_SEED + '-' + CLIENT_SEEDS.join('-') + '-' + NONCE + '';
const hash = crypto.createHash('sha256').update(concatenated_hash).digest('hex');
const ticket = parseInt(hash.substring(0, 8), 16) % PRECISION;
console.log("Ticket: " + ticket / PRECISION);