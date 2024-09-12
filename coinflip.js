import crypto from 'crypto';

const PRECISION = 100000000; 
const SERVER_SEED = '453a6377f7326004d80d60b5f210a1bed8a2f60fc21a9791c9ab9828bcb1138d';
const CREATOR_CLIENT_SEED = '3306ce0306c08949101df36f1d8c97f6';
const JOINER_CLIENT_SEED = 'c44101d98da46f134bdbed4393f7c60f';
const NONCE = 1;

const concatenated_seed = SERVER_SEED + '-' + CREATOR_CLIENT_SEED + '-' + JOINER_CLIENT_SEED + '-' + NONCE + '';
const hash = crypto.createHash('sha256').update(concatenated_seed).digest('hex');
const ticket = parseInt(hash.slice(0, 8), 16) % PRECISION;
console.log('Ticket:', ticket / PRECISION);