import {
	ForecastParams,
	LocationParams,
	WeatherData,
	Location,
} from '@/types/types';
import {
	FETCH_WEATHER,
	FETCH_LOCATIONS,
	FETCH_WEATHER_SUCCESS,
	FETCH_LOCATIONS_SUCCESS,
	FETCH_WEATHER_FAILURE,
	FETCH_LOCATIONS_FAILURE,
	LOAD_CACHED_WEATHER,
	LOAD_CACHED_WEATHER_SUCCESS,
	LOAD_CACHED_WEATHER_FAILURE,
	RESET_LOCATIONS,
} from './actionTypes';

export const fetchWeather = (params: ForecastParams) => ({
	type: FETCH_WEATHER,
	payload: params,
});

export const fetchWeatherSuccess = (data: WeatherData) => ({
	type: FETCH_WEATHER_SUCCESS,
	payload: data,
});

export const fetchWeatherFailure = (error: string) => ({
	type: FETCH_WEATHER_FAILURE,
	payload: error,
});

export const fetchLocations = (params: LocationParams) => ({
	type: FETCH_LOCATIONS,
	payload: params,
});

export const fetchLocationsSuccess = (data: Location[]) => ({
	type: FETCH_LOCATIONS_SUCCESS,
	payload: data,
});

export const fetchLocationsFailure = (error: string) => ({
	type: FETCH_LOCATIONS_FAILURE,
	payload: error,
});

export const resetLocations = () => ({
	type: RESET_LOCATIONS,
});

export const loadCachedWeather = () => ({
	type: LOAD_CACHED_WEATHER,
});

export const loadCachedWeatherSuccess = (data: WeatherData) => ({
	type: LOAD_CACHED_WEATHER_SUCCESS,
	payload: data,
});

export const loadCachedWeatherFailure = (error: string) => ({
	type: LOAD_CACHED_WEATHER_FAILURE,
	payload: error,
});
