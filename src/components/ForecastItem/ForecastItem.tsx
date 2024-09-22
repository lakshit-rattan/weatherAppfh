import { theme } from '@/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity } from 'react-native';

export default function ForecastItem({ item }) {
	const navigation = useNavigation();
	let dayName = new Date(item.date).toLocaleDateString('en-US', {
		weekday: 'long',
	});
	dayName = dayName.split(',')[0];
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Detail',{forecastDetails: item});
			}}
			className="flex justify-center items-center w-24 rounded-2xl py-4 space-y-2 mr-4"
			style={{ backgroundColor: theme.white(0.15) }}
		>
			<Image
				source={{ uri: `https:${item?.day?.condition?.icon}` }}
				className="h-11 w-11"
			/>
			<Text className="text-white font-semibold">{dayName}</Text>
			<Text className="text-white">H: {item?.day?.maxtemp_c}°</Text>
			<Text className="text-white">L: {item?.day?.mintemp_c}°</Text>
		</TouchableOpacity>
	);
}
