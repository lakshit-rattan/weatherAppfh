import { View, Text, Image } from 'react-native';

interface Weather {
	current?: {
		wind_kph?: number;
		humidity?: number;
	};
	forecast?: {
		forecastday?: Array<{
			astro?: {
				sunrise?: string;
			};
		}>;
	};
}

interface ForecastPropProps {
	weather: Weather;
}

export default function ForecastProp({ weather }: ForecastPropProps) {
	return (
		<View className="flex-row justify-between mx-4">
			<View className="flex-row space-x-2 items-center">
				<Image
					source={require('../../theme/assets/icons/wind.png')}
					className="h-6 w-6"
				/>
				<Text className="text-white font-semibold text-base">
					{weather.current?.wind_kph}km
				</Text>
			</View>
			<View className="flex-row space-x-2 items-center">
				<Image
					source={require('../../theme/assets/icons/drop.png')}
					className="h-6 w-6"
				/>
				<Text className="text-white font-semibold text-base">
					{weather.current?.humidity}%
				</Text>
			</View>
			<View className="flex-row space-x-2 items-center">
				<Image
					source={require('../../theme/assets/icons/sun.png')}
					className="h-6 w-6"
				/>
				<Text className="text-white font-semibold text-base">
					{weather?.forecast?.forecastday?.[0]?.astro?.sunrise}
				</Text>
			</View>
		</View>
	);
}
