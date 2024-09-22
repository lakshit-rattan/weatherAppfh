// components/AstroCard.js
import React from 'react';
import { View, Text } from 'react-native';

function AstroCard({ astro }) {
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
