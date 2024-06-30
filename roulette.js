import crypto from 'crypto';

// replace with the values from the round you want to verify
const SERVER_SEED = 'b4b4b374240642986f70b276680974a7b807d58959c1148c33958c87a6829c98';
const SERVER_SEED_HASHED = '6e53de566d92c9c2d365d044f4467cd3806ae37d8454d5ab0e9c3b57f72c9a11';
const CLIENT_SEED = 'c3a52eaa232a27796ea187cdaf61073d';

const concatenated_seed = SERVER_SEED + '-' + CLIENT_SEED;

const hash = crypto.createHash('sha256').update(concatenated_seed).digest('hex');
const checkedServerSeed = crypto.createHash('sha256').update(SERVER_SEED).digest('hex');
const ticket = parseInt(hash.substring(0, 8), 16) % 15;

if (SERVER_SEED_HASHED === checkedServerSeed) {
    console.log('\x1b[32m%s\x1b[0m', 'Server seed is correct');
} else {
    console.log('\x1b[31m%s\x1b[0m', 'Server seed is incorrect');
}

console.log('Roll:', ticket);