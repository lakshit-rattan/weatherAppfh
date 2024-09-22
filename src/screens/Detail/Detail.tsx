import { View, Text, ScrollView, Image, StatusBar } from 'react-native';
import { weatherImages } from '@/services/constants'; // Assuming you have weather images
import { useRoute } from '@react-navigation/native';
import { AstroCard, ForecastCard, HourlyForecastCard } from '@/components';

function DetailsScreen() {
	const route = useRoute();
	console.log('route', route.params);

	const { forecastDetails }= route.params; // The forecast details passed from the Home screen

	const { day, astro, hour } = forecastDetails;

	return (
		<View className="flex-1">
			<StatusBar barStyle="light-content" />
			<Image
				blurRadius={70}
				source={require('../../theme/assets/images/bg.png')}
				className="w-full h-full absolute"
			/>
			<View className="flex-1 p-3">
				<View className="mb-6">
					<Text className="text-white text-2xl font-bold text-center">
						Weather Details for {forecastDetails.date}
					</Text>
				</View>

				<ForecastCard day={day} />

				<AstroCard astro={astro} />

				{/* Hourly Forecast */}
				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
					{hour?.map((hourData, index) => (
						<HourlyForecastCard key={index} hourData={hourData} />
					))}
				</ScrollView>
			</View>
		</View>
	);
}

export default DetailsScreen;
