import { View, Text } from 'react-native';

type Condition = {
	text: string;
};

type Day = {
	maxtemp_c: number;
	mintemp_c: number;
	avgtemp_c: number;
	condition: Condition;
	maxwind_kph: number;
	totalprecip_mm: number;
	uv: number;
};

type ForecastCardProps = {
	day: Day;
};

function ForecastCard({ day }: ForecastCardProps) {
	return (
		<View className="bg-gray-900 p-4 rounded-lg mb-4">
			<Text className="text-white text-3xl mb-2">Day Overview</Text>
			<Text className="text-white">• Max Temp: {day?.maxtemp_c}°C</Text>
			<Text className="text-white">• Min Temp: {day?.mintemp_c}°C</Text>
			<Text className="text-white">• Avg Temp: {day?.avgtemp_c}°C</Text>
			<Text className="text-white">• Condition: {day?.condition?.text}</Text>
			<Text className="text-white">• Max Wind: {day?.maxwind_kph} kph</Text>
			<Text className="text-white">
				• Precipitation: {day?.totalprecip_mm} mm
			</Text>
			<Text className="text-white">• UV Index: {day?.uv}</Text>
		</View>
	);
}

export default ForecastCard;
