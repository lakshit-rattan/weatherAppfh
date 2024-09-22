import { View, Text, Image } from 'react-native';

export default function HourlyForecastCard({ hourData }) {
	return (
		<View
			style={{ minWidth: 163, maxWidth: 193 }}
			className="bg-gray-800 p-4 justify-center rounded-lg mx-1"
		>
			<Text
				style={{ alignSelf: 'center' }}
				className="text-white text-2xl mb-1 font-bold"
			>
				{hourData.time.split(' ')[1]}
			</Text>
			<Image
				source={{ uri: `https:${hourData?.condition?.icon}` }}
				className="w-28 h-28"
				style={{ alignSelf: 'center' }}
				resizeMode="contain"
			/>
			<Text className="text-white  mb-1">• Temp: {hourData.temp_c}°</Text>
			<Text className="text-white  mb-1">
				• Condition: {hourData?.condition?.text}
			</Text>
			<Text className="text-white  mb-1">• Wind: {hourData?.wind_kph} kph</Text>
			<Text className="text-white mb-1">
				• Precipitation: {hourData?.precip_mm} mm
			</Text>
			<Text className="text-white">• Humidity: {hourData?.humidity}%</Text>
		</View>
	);
}
