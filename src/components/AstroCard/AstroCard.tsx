import { View, Text } from 'react-native';

type Astro = {
	sunrise: string;
	sunset: string;
	moonrise: string;
	moonset: string;
	moon_phase: string;
	moon_illumination: string;
};

type AstroCardProps = {
	astro: Astro;
};

function AstroCard({ astro }: AstroCardProps) {
	return (
		<View className="bg-gray-900 p-4 rounded-lg mb-4">
			<Text className="text-white text-3xl mb-2">Astro Information</Text>
			<Text className="text-white">• Sunrise: {astro?.sunrise}</Text>
			<Text className="text-white">• Sunset: {astro?.sunset}</Text>
			<Text className="text-white">• Moonrise: {astro?.moonrise}</Text>
			<Text className="text-white">• Moonset: {astro?.moonset}</Text>
			<Text className="text-white">• Moon Phase: {astro?.moon_phase}</Text>
			<Text className="text-white">
				• Moon Illumination: {astro?.moon_illumination}%
			</Text>
		</View>
	);
}

export default AstroCard;
