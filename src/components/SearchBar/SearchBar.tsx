import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useCallback, useState } from 'react';
import { fetchLocations, fetchWeatherForecast } from '@/services/api';
import { debounce } from 'lodash';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { theme } from '@/theme/theme';
import { storage } from '@/storage';

export default function SearchBar({ setWeather, setIsLoading, setDays }) {
	const [showSearch, setShowSearch] = useState(false);
	const [locations, setLocations] = useState([]);

	const toggleSearch = () => {
		setShowSearch(!showSearch);
		setLocations([]);
	};

	const handleLocation = loc => {
		setLocations([]);
		setDays(3);
		toggleSearch();
		setIsLoading(true);
		fetchWeatherForecast({ cityName: loc.name, days: 3 })
			.then(data => {
				setWeather(data);
				setIsLoading(false);
				storage.set('city', loc.name);
			})
			.catch(err => {
				console.log('err', err);
			});
	};

	const handleSearch = (value: string) => {
		//fetch locations
		if (value.length > 2) {
			fetchLocations({
				cityName: value,
			})
				.then(res => {
					if (res.length === 0) {
						Alert.alert('Alert', 'No locations found', [{ text: 'Continue' }]);
						return;
					}
					setLocations(res);
				})
				.catch(err => {
					console.log('err', err);
				});
		}
	};

	const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
	return (
		<View style={{ height: '7%' }} className="m-4 relative z-50">
			<View
				className="flex-row justify-end items-center rounded-full"
				style={{
					backgroundColor: showSearch ? theme.white(0.2) : 'transparent',
				}}
			>
				{showSearch ? (
					<TextInput
						onChangeText={handleTextDebounce}
						placeholder="Search city"
						placeholderTextColor="lightgray"
						className="flex-1 pl-6 h-10 text-base text-white"
					/>
				) : null}

				<TouchableOpacity
					onPress={() => toggleSearch()}
					className="rounded-full p-3 m-1"
					style={{ backgroundColor: theme.white(0.3) }}
				>
					<MagnifyingGlassIcon size="25" color="white" />
				</TouchableOpacity>
			</View>
			{locations.length > 0 && showSearch ? (
				<View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
					{locations.map((loc, index) => {
						const showBorder = index + 1 !== locations.length;
						const borderClass = showBorder
							? 'border-b-2 border-b-gray-400'
							: '';
						return (
							<TouchableOpacity
								onPress={() => handleLocation(loc)}
								key={index}
								className={`flex-row items-center p-3 border-0 px-4 mb-1 ${borderClass}`}
							>
								<MapPinIcon size="20" color="gray" />
								<Text className="text-black text-lg ml-2 ">
									{loc?.name}, {loc?.country}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			) : null}
		</View>
	);
}
