import crypto from 'crypto';

const SERVER_SEED = 'cfb29db5686781e9ef2534a89a149aa3cef24182aaef102fd852d8b743611eaa';
const SERVER_SEED_HASHED = 'ad8da32fa39ee46d2adace70ffb91c9475ff450d65d2eb97e384069052516bfa';

// client seed is the one found in your profile settings
const CLIENT_SEED = 'df0a9c1a1349a4fda66fbb9be9aefe25';

// number of bombs in the game
const NUM_BOMBS = 5;

const concatenated_seed = CLIENT_SEED + SERVER_SEED;
const checkedServerSeed = crypto.createHash('sha256').update(SERVER_SEED).digest('hex');

/**
 * Calculate the bomb locations for the game
 * @param {number} bombs number of bombs in game
 * @param {string} concatenated_hash concatenated seed for game
 * @returns {number[]} array of bomb locations
 */
function generate_bomb_locations(bombs, concatenated_hash) {
	let bombs_list = new Array(25);
	let array = [];
	let hash = crypto.createHmac("sha256", concatenated_hash).digest("hex");
 
	while (array.length < bombs) {
		let bomb = parseInt(hash.substring(0, 2), 16) % 25;
		hash = crypto.createHmac("sha256", hash).digest("hex");
		if (bombs_list[bomb] === undefined && bomb < 25) {
			bombs_list[bomb] = true;
			array.push(bomb);
		}
	}
 
	return array;
}

const bomb_locations = generate_bomb_locations(NUM_BOMBS, concatenated_seed);

if (SERVER_SEED_HASHED === checkedServerSeed) {
    console.log('\x1b[32m%s\x1b[0m', 'Server seed is correct');
} else {
    console.log('\x1b[31m%s\x1b[0m', 'Server seed is incorrect');
}

console.log('Bomb locations:', bomb_locations);
