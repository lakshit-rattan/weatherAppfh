import {
	View,
	Text,
	ScrollView,
	Image,
	StatusBar,
	Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AstroCard, ForecastCard, HourlyForecastCard } from '@/components';
import { ForecastDay } from '@/types/types';

function DetailsScreen() {
	const route = useRoute();

	const { forecastDetails } = route.params as { forecastDetails: ForecastDay };

	const { day, astro, hour } = forecastDetails;

	return (
		<ScrollView className="flex-1">
			<StatusBar barStyle="light-content" />
			<Image
				blurRadius={70}
				source={require('../../theme/assets/images/bg.png')}
				className="w-full h-full absolute"
			/>
			<View className="flex-1 p-3">
				<View
					style={Platform.OS === 'ios' ? { marginTop: 50 } : undefined}
					className="mb-6"
				>
					<Text className="text-white text-2xl font-bold text-center">
						Weather Details for {forecastDetails.date}
					</Text>
				</View>

				<ForecastCard day={day} />

				<AstroCard astro={astro} />

				{/* Hourly Forecast */}
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					className="mb-6"
				>
					{hour?.map((hourData, index) => (
						<HourlyForecastCard key={index} hourData={hourData} />
					))}
				</ScrollView>
			</View>
		</ScrollView>
	);
}

export default DetailsScreen;
