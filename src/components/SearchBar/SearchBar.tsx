import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchLocations, fetchWeather } from '@/redux/actions/weatherActions';
import { theme } from '@/theme/theme';
import { SearchBarProps } from '@/types/types';

// eslint-disable-next-line react/function-component-definition
const SearchBar: React.FC<SearchBarProps> = ({ setDays }) => {
	const dispatch = useDispatch();
	const [showSearch, setShowSearch] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const locations = useSelector((state: RootState) => state.weather.locations);

	const toggleSearch = () => {
		setShowSearch(!showSearch);
		setInputValue('');
	};

	const handleLocationSelect = (loc: string) => {
		toggleSearch();
		dispatch({ type: 'RESET_LOCATIONS' });
		dispatch(fetchWeather({ cityName: loc.name, days: 3 }));
		setDays(3);
	};

	const handleSearch = (value: string) => {
		if (value.length > 2) {
			dispatch(fetchLocations({ cityName: value }));
		} else {
			dispatch({ type: 'RESET_LOCATIONS' });
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
				{showSearch && (
					<TextInput
						value={inputValue}
						onChangeText={text => {
							setInputValue(text);
							handleTextDebounce(text);
						}}
						placeholder="Search city"
						placeholderTextColor="lightgray"
						className="flex-1 pl-6 h-10 text-base text-white"
					/>
				)}
				<TouchableOpacity
					onPress={toggleSearch}
					className="rounded-full p-3 m-1"
					style={{ backgroundColor: theme.white(0.3) }}
				>
					<MagnifyingGlassIcon size="25" color="white" />
				</TouchableOpacity>
			</View>
			{/* Display search results */}
			{locations?.length > 0 && showSearch && (
				<ScrollView className="absolute w-full bg-gray-300 top-16 rounded-3xl">
					{locations?.map((loc, index) => (
						<TouchableOpacity
							onPress={() => handleLocationSelect(loc)}
							key={index}
							className={`flex-row items-center p-3 border-0 px-4 mb-1 ${
								index + 1 !== locations.length
									? 'border-b-2 border-b-gray-400'
									: ''
							}`}
						>
							<MapPinIcon size="20" color="gray" />
							<Text className="text-black text-lg ml-2">
								{loc.name}, {loc.country}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default SearchBar;
