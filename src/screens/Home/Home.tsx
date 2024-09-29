import { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	StatusBar,
	Image,
	SafeAreaView,
	KeyboardAvoidingView,
	ActivityIndicator,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import {
	PlusCircleIcon,
	MinusCircleIcon,
} from 'react-native-heroicons/outline';
import { fetchWeatherForecast } from '@/services/api/api';
import { weatherImages } from '@/services/utils/constants';
import { ForecastItem, ForecastProp, SearchBar } from '@/components';
import { storage } from '@/storage';
import { WeatherData } from '@/types/types';

function HomeScreen() {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [days, setDays] = useState(3);
	const { current, location } = weather || {};

	const fetchData = async (dayCount: number = 3, cityName?: string) => {
		try {
			const myCity = cityName || storage.getString('city') || 'Noida';
			const data = await fetchWeatherForecast({
				cityName: myCity,
				days: dayCount,
			});
			setWeather(data);
		} catch (err) {
			Alert.alert(
				'Alert',
				'Error fetching Forecast data. Please restart the app.',
				[{ text: 'Continue' }],
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDayChange = (day: number) => {
		setDays(day);
		setIsLoading(true); // show loader while new data is fetched
		fetchData(day, location?.name);
	};

	// const handleDayChange = day => {
	// 	setDays(day);
	// 	fetchWeatherForecast({ cityName: location?.name, days: day })
	// 		.then(data => {
	// 			setWeather(data);
	// 			setIsLoading(false);
	// 		})
	// 		.catch(err => {
	// 			console.log('err', err);
	// 		});
	// };
	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			className="flex-1 relative bg-black"
		>
			<StatusBar barStyle="light-content" />
			<Image
				blurRadius={70}
				source={require('../../theme/assets/images/bg.png')}
				className="w-full h-full absolute"
				resizeMode="cover"
			/>
			{isLoading ? (
				<View className="flex-1 flex-row justify-center items-center">
					<ActivityIndicator size={260} color="white" />
				</View>
			) : (
				<KeyboardAvoidingView className="flex flex-1">
					<SafeAreaView className="flex flex-1">
						<SearchBar
							setWeather={setWeather}
							setIsLoading={setIsLoading}
							setDays={setDays}
						/>
						<View className="mx-4 flex justify-around flex-1 mb-2">
							{/* Location */}
							<Text className="text-white text-center text-2xl font-bold">
								{location?.name},
								<Text className="text-lg font-semibold text-gray-300">
									{' ' + location?.country}
								</Text>
							</Text>
							{/* Weather Image */}
							<View className="flex-row justify-center">
								<Image
									source={weatherImages[current?.condition?.text]}
									className="h-52 w-52"
								/>
							</View>
							{/* Degree Celsius */}
							<View className="space-y-2 ">
								<Text className="text-center font-bold text-white text-6xl ml-5">
									{current?.temp_c}°
								</Text>
								<Text className="text-center text-white text-xl tracking-widest">
									{current?.condition?.text}
								</Text>
							</View>
							<ForecastProp weather={weather} />
						</View>

						{/* Forecast section for next days */}
						<View className="mb-6 space-y-3">
							<View className="flex-row justify-between">
								<View className="flex-row items-center mx-5 space-x-2">
									<CalendarDaysIcon size={22} color="white" />
									<Text className="text-white text-base"> Daily forecast</Text>
								</View>
								<View className="flex-row items-center justify-center mr-2">
									<TouchableOpacity
										disabled={days === 3}
										onPress={() => handleDayChange(days - 1)}
									>
										<MinusCircleIcon
											size={22}
											color={days === 3 ? 'gray' : 'white'}
										/>
									</TouchableOpacity>
									<Text className="text-white text-lg mr-1"> {days} days</Text>
									<TouchableOpacity
										disabled={days === 10}
										onPress={() => handleDayChange(days + 1)}
									>
										<PlusCircleIcon
											size={22}
											color={days === 10 ? 'gray' : 'white'}
										/>
									</TouchableOpacity>
								</View>
							</View>
							<ScrollView
								horizontal
								contentContainerStyle={{ paddingHorizontal: 15 }}
								showsHorizontalScrollIndicator={false}
							>
								{weather?.forecast?.forecastday.map((item, index) => (
									<ForecastItem key={index} item={item} />
								))}
							</ScrollView>
						</View>
					</SafeAreaView>
				</KeyboardAvoidingView>
			)}
		</ScrollView>
	);
}

export default HomeScreen;
