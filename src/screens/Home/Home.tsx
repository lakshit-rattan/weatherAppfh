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
} from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import { fetchWeatherForecast } from '@/services/api';
import { weatherImages } from '@/services/constants';
import { ForecastItem, ForecastProp, SearchBar } from '@/components';
import { storage } from '@/storage';

function HomeScreen() {
	const [weather, setWeather] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { current, location } = weather;

	useEffect(() => {
		const fetchData = async () => {
			const myCity = storage.getString('city');
			const cityName = myCity ? myCity : 'Noida';
			return fetchWeatherForecast({ cityName, days: 3 })
				.then(data => {
					setWeather(data);
					setIsLoading(false);
				})
				.catch(err => {
					console.log('err', err);
				});
		};

		fetchData();
	}, []);

	return (
		<View className="flex-1 relative bg-black">
			<StatusBar barStyle="light-content" />
			<Image
				blurRadius={70}
				source={require('../../theme/assets/images/bg.png')}
				className="w-full h-full absolute"
			/>
			{isLoading ? (
				<View className="flex-1 flex-row justify-center items-center">
					<ActivityIndicator size={260} color="white" />
				</View>
			) : (
				<KeyboardAvoidingView className="flex flex-1">
					<SafeAreaView className="flex flex-1">
						{/* <SearchBar /> */}
						<SearchBar setWeather={setWeather} setIsLoading={setIsLoading} />
						{/* Forecast section */}
						<View className="mx-4 flex justify-around flex-1 mb-2">
							{/* Location */}
							<Text className="text-white text-center text-2xl font-bold">
								{location?.name},
								<Text className="text-lg font-semibold text-gray-300">
									{' ' + location?.country}
								</Text>
							</Text>
							{/* weather Image */}
							<View className="flex-row justify-center">
								<Image
									source={weatherImages[current?.condition?.text]}
									className="h-52 w-52"
								/>
							</View>
							{/* degree celsius */}
							<View className="space-y-2 ">
								<Text className="text-center font-bold text-white text-6xl ml-5">
									{current?.temp_c}°
								</Text>
								<Text className="text-center text-white text-xl tracking-widest">
									{current?.condition?.text}
								</Text>
							</View>
							{/* other stats */}
							<ForecastProp weather={weather} />
						</View>

						{/* Forecast section for our next days */}
						<View className="mb-6 space-y-3">
							<View className="flex-row justify-between">
								<View className="flex-row items-center mx-5 space-x-2">
									<CalendarDaysIcon size="22" color="white" />
									<Text className="text-white text-base"> Daily forecast</Text>
								</View>
								<Text className="text-white text-xl mr-2"> - 3 days +</Text>
							</View>
							<ScrollView
								horizontal
								contentContainerStyle={{ paddingHorizontal: 15 }}
								showsHorizontalScrollIndicator={false}
							>
								{/* Cards */}
								{weather?.forecast?.forecastday.map((item, index) => {
									return <ForecastItem key={index} item={item} />;
								})}
							</ScrollView>
						</View>
					</SafeAreaView>
				</KeyboardAvoidingView>
			)}
		</View>
	);
}

export default HomeScreen;
