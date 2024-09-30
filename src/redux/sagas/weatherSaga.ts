import { call, put, takeLatest } from 'redux-saga/effects';
import {
	ForecastParams,
	Location,
	LocationParams,
	WeatherData,
} from '@/types/types';
import { fetchWeatherForecast, fetchLocations } from '@/services/api/api';
import { Alert } from 'react-native';
import { storage } from '@/storage';
import {
	fetchWeatherSuccess,
	fetchWeatherFailure,
	fetchLocationsSuccess,
	fetchLocationsFailure,
	fetchWeather,
	loadCachedWeatherFailure,
	loadCachedWeatherSuccess,
} from '../actions/weatherActions';
import {
	FETCH_WEATHER,
	FETCH_LOCATIONS,
	LOAD_CACHED_WEATHER,
} from '../actions/actionTypes';

function* fetchWeatherSaga(action: { type: string; payload: ForecastParams }) {
	try {
		const data: WeatherData = yield call(fetchWeatherForecast, action.payload);
		if (data) {
			storage.set('lastWeatherData', JSON.stringify(data));
			yield put(fetchWeatherSuccess(data));
		} else {
			yield put(fetchWeatherFailure('Failed to fetch weather data'));
		}
	} catch (error) {
		const cachedData = storage.getString('lastWeatherData');
		if (cachedData) {
			yield put(fetchWeatherSuccess(JSON.parse(cachedData)));
		} else {
			yield put(fetchWeatherFailure('No cached weather data available'));
		}
	}
}

function* fetchLocationsSaga(action: {
	type: string;
	payload: LocationParams;
}) {
	try {
		const locations: Location[] = yield call(fetchLocations, action.payload);
		if (locations.length === 0) {
			Alert.alert('Alert', 'No locations found', [{ text: 'Continue' }]);
		} else {
			yield put(fetchLocationsSuccess(locations));
		}
	} catch (error) {
		yield put(fetchLocationsFailure(error.message));
	}
}

function* loadCachedWeatherSaga() {
	try {
		const lastWeatherData = storage.getString('lastWeatherData');
		if (lastWeatherData) {
			yield put(loadCachedWeatherSuccess(JSON.parse(lastWeatherData)));
		} else {
			// If no data is found, default to Noida
			yield put(fetchWeather({ cityName: 'Noida', days: 3 }));
		}
	} catch (error) {
		yield put(loadCachedWeatherFailure('Failed to load cached weather data'));
	}
}

export function* weatherSaga() {
	yield takeLatest(FETCH_WEATHER, fetchWeatherSaga);
	yield takeLatest(FETCH_LOCATIONS, fetchLocationsSaga);
	yield takeLatest(LOAD_CACHED_WEATHER, loadCachedWeatherSaga);
}
