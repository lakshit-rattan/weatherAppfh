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
} from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import {
	PlusCircleIcon,
	MinusCircleIcon,
} from 'react-native-heroicons/outline';
import { weatherImages } from '@/services/utils/constants';
import { ForecastItem, ForecastProp, SearchBar } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
	fetchWeather,
	loadCachedWeather,
} from '@/redux/actions/weatherActions';
import { storage } from '@/storage';

function HomeScreen() {
	const dispatch = useDispatch();
	const [days, setDays] = useState<number>(storage.getNumber('days') || 3);
	const { forecast, loading } = useSelector(
		(state: RootState) => state.weather,
	);

	useEffect(() => {
		// Default fetch weather for previous stored location or Noida on first load
		dispatch(loadCachedWeather());
		storage.set('days', days);
	}, [dispatch, days]);

	const handleDayChange = (day: number) => {
		setDays(day);
		dispatch(
			fetchWeather({
				cityName: forecast?.location?.name || 'Noida',
				days: day,
			}),
		);
	};

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
			{loading ? (
				<View className="flex-1 flex-row justify-center items-center">
					<ActivityIndicator size={260} color="white" />
				</View>
			) : (
				<KeyboardAvoidingView className="flex flex-1">
					<SafeAreaView className="flex flex-1">
						<SearchBar setDays={setDays} />
						<View className="mx-4 flex justify-around flex-1 mb-2">
							<Text className="text-white text-center text-2xl font-bold">
								{forecast?.location?.name},
								<Text className="text-lg font-semibold text-gray-300">
									{' ' + forecast?.location?.country}
								</Text>
							</Text>
							<View className="flex-row justify-center">
								<Image
									source={
										weatherImages[forecast?.current?.condition?.text] ||
										weatherImages['Sunny']
									}
									className="h-52 w-52"
								/>
							</View>
							{/* Degree Celsius */}
							<View className="space-y-2">
								<Text className="text-center font-bold text-white text-6xl ml-5">
									{forecast?.current?.temp_c}°
								</Text>
								<Text className="text-center text-white text-xl tracking-widest">
									{forecast?.current?.condition?.text}
								</Text>
							</View>
							<ForecastProp weather={forecast} />
						</View>

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
								{forecast?.forecast?.forecastday.map((item, index) => (
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
