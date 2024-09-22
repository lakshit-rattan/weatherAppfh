import { View, Text, Image } from 'react-native';

interface HourlyCondition {
	icon?: string;
	text?: string;
}

interface HourData {
	time: string;
	temp_c?: number;
	condition?: HourlyCondition;
	wind_kph?: number;
	precip_mm?: number;
	humidity?: number;
}

interface HourlyForecastCardProps {
	hourData: HourData;
}

export default function HourlyForecastCard({
	hourData,
}: HourlyForecastCardProps) {
	return (
		<View className="bg-gray-800 p-4 justify-center rounded-lg mx-2 w-44 min-h-50">
			<Text className="text-white text-2xl mb-2 font-bold text-center">
				{hourData.time.split(' ')[1]}
			</Text>
			<Image
				source={{ uri: `https:${hourData?.condition?.icon}` }}
				className="w-20 h-20 mx-auto"
				resizeMode="contain"
			/>
			<Text className="text-white mb-1">• Temp: {hourData.temp_c}°</Text>
			<Text className="text-white mb-1">
				• Condition: {hourData?.condition?.text}
			</Text>
			<Text className="text-white mb-1">• Wind: {hourData?.wind_kph} kph</Text>
			<Text className="text-white mb-1">
				• Precipitation: {hourData?.precip_mm} mm
			</Text>
			<Text className="text-white">• Humidity: {hourData?.humidity}%</Text>
		</View>
	);
}
