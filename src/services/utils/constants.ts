export const weatherImages = {
	'Partly Cloudy': require('../../theme/assets/images/partlycloudy.png'),
	'Partly cloudy': require('../../theme/assets/images/partlycloudy.png'),
	'Moderate rain': require('../../theme/assets/images/moderaterain.png'),
	'Patchy rain possible': require('../../theme/assets/images/moderaterain.png'),
	'Sunny': require('../../theme/assets/images/sun.png'),
	'Clear': require('../../theme/assets/images/sun.png'),
	'Overcast': require('../../theme/assets/images/cloud.png'),
	'Cloudy': require('../../theme/assets/images/cloud.png'),
	'Light rain': require('../../theme/assets/images/moderaterain.png'),
	'Moderate rain at times': require('../../theme/assets/images/moderaterain.png'),
	'Heavy rain': require('../../theme/assets/images/heavyrain.png'),
	'Heavy rain at times': require('../../theme/assets/images/heavyrain.png'),
	'Moderate or heavy freezing rain': require('../../theme/assets/images/heavyrain.png'),
	'Moderate or heavy rain shower': require('../../theme/assets/images/heavyrain.png'),
	'Moderate or heavy rain with thunder': require('../../theme/assets/images/heavyrain.png'),
	'other': require('../../theme/assets/images/moderaterain.png'),
	'Patchy rain nearby': require('../../theme/assets/images/moderaterain.png'),
	'Mist': require('../../theme/assets/images/mist.png'),
	'Light drizzle': require('../../theme/assets/images/moderaterain.png'),
};

export const stringTruncate = (
	string: string | undefined,
	maxLength: number = 10,
): string => {
	if (!string) return '';
	const isTruncate = string.length > maxLength;
	return isTruncate ? `${string.substring(0, maxLength)}...` : string;
};
