import { ForecastParams, LocationParams } from '@/types/types';
import axios from 'axios';

const forecastEndpoint = (params: ForecastParams): string =>
	`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationsEndpoint = (params: LocationParams): string =>
	`https://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${params.cityName}`;

const apiCall = async <T>(endpoint: string): Promise<T | null> => {
	try {
		const response = await axios.get<T>(endpoint);
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
};

export const fetchWeatherForecast = (params: ForecastParams) => {
	return apiCall(forecastEndpoint(params));
};

export const fetchLocations = (params: LocationParams) => {
	return apiCall(locationsEndpoint(params));
};
