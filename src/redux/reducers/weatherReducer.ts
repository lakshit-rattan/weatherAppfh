import { WeatherData, Location } from '@/types/types';
import { Reducer } from '@reduxjs/toolkit';
import {
	FETCH_WEATHER,
	FETCH_WEATHER_SUCCESS,
	FETCH_WEATHER_FAILURE,
	FETCH_LOCATIONS,
	FETCH_LOCATIONS_SUCCESS,
	FETCH_LOCATIONS_FAILURE,
	RESET_LOCATIONS,
	LOAD_CACHED_WEATHER,
	LOAD_CACHED_WEATHER_SUCCESS,
	LOAD_CACHED_WEATHER_FAILURE,
} from '../actions/actionTypes';

type WeatherState = {
	forecast: WeatherData | null;
	locations: Location[];
	loading: boolean;
	error: string | null;
};

const initialState: WeatherState = {
	forecast: null,
	locations: [],
	loading: false,
	error: null,
};

type ActionTypes =
	| { type: typeof FETCH_WEATHER }
	| { type: typeof FETCH_WEATHER_SUCCESS; payload: WeatherData }
	| { type: typeof FETCH_WEATHER_FAILURE; payload: string }
	| { type: typeof FETCH_LOCATIONS }
	| { type: typeof FETCH_LOCATIONS_SUCCESS; payload: Location[] }
	| { type: typeof FETCH_LOCATIONS_FAILURE; payload: string }
	| { type: typeof RESET_LOCATIONS }
	| { type: typeof LOAD_CACHED_WEATHER }
	| { type: typeof LOAD_CACHED_WEATHER_SUCCESS; payload: WeatherData }
	| { type: typeof LOAD_CACHED_WEATHER_FAILURE; payload: string };

export const weatherReducer: Reducer<WeatherState, ActionTypes> = (
	state: WeatherState = initialState,
	action: ActionTypes,
) => {
	switch (action.type) {
		case FETCH_WEATHER:
		case LOAD_CACHED_WEATHER:
			return { ...state, loading: true, error: null };
		case FETCH_WEATHER_SUCCESS:
		case LOAD_CACHED_WEATHER_SUCCESS:
			return { ...state, forecast: action.payload, loading: false };
		case FETCH_WEATHER_FAILURE:
		case LOAD_CACHED_WEATHER_FAILURE:
			return { ...state, error: action.payload, loading: false };
		case FETCH_LOCATIONS:
			return { ...state, loading: false, error: null };
		case FETCH_LOCATIONS_SUCCESS:
			return { ...state, locations: action.payload, loading: false };
		case RESET_LOCATIONS:
			return { ...state, locations: [] };
		default:
			return state;
	}
};
