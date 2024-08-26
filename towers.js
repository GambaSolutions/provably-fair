import crypto from 'crypto';

// replace with the values from the round you want to verify
const SERVER_SEED = '2e946c4f0131a6a4bb112fddc663fede884aae1a4d7dc74d8cb1755997ea7100';
const CLIENT_SEED = '3306ce0306c08949101df36f1d8c97f6';
const NONCE = 16;
const RISK_LEVEL = 'easy';

export const TOWERS_SETTINGS = {
    'easy': {
        num_bombs: 1,
        num_cols: 4,
        levels: 9
    },
    'medium': {
        num_bombs: 1,
        num_cols: 3,
        levels: 9
    },
    'hard': {
        num_bombs: 1,
        num_cols: 2,
        levels: 9
    }
}

const generateBombLocations = (riskLevel, concatenatedHash) => {
	const towerSetting = TOWERS_SETTINGS[riskLevel];
	const bombs = [];

	for (let i = 0; i < towerSetting.levels; i++) {
		const levelBombs = [];
		const levelHash = crypto.createHmac('sha256', concatenatedHash + i).digest('hex');

		for (let j = 0; j < towerSetting.num_bombs; j++) {
			const start = j * 2;
			const end = start + 2;

			// Ensure we don't exceed hash length
			if (end > levelHash.length) {
				throw new Error('Hash is not long enough to generate bomb locations');
			}

			const bombIndex = parseInt(levelHash.substring(start, end), 16) % towerSetting.num_cols;
			levelBombs.push(bombIndex);
		}
		bombs.push({ level: i, bomb_locations: levelBombs });
	}

	return bombs;
};

const concatenated_seed = SERVER_SEED + '-' + CLIENT_SEED + '-' + NONCE + '';
console.log('Bomb locations:', generateBombLocations(RISK_LEVEL, concatenated_seed));