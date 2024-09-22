export interface Condition {
	text: string;
	icon: string;
	code: number;
}

export interface Day {
	maxtemp_c: number;
	mintemp_c: number;
	avgtemp_c: number;
	condition: Condition;
}

export interface Astro {
	sunrise: string;
	sunset: string;
}

export interface Hour {
	time: string;
	temp_c: number;
	condition: Condition;
	wind_kph: number;
	precip_mm: number;
	humidity: number;
}

export interface ForecastDay {
	date: string;
	day: Day;
	astro: Astro;
	hour: Hour[];
}

export interface Location {
	name: string;
	country: string;
}

export interface Current {
	temp_c: number;
	condition: Condition;
}

export interface WeatherData {
	location: Location;
	current: Current;
	forecast: {
		forecastday: ForecastDay[];
	};
}

export interface SearchBarProps {
	setWeather: (data: WeatherData) => void;
	setIsLoading: (loading: boolean) => void;
	setDays: (days: number) => void;
}

export interface ForecastParams {
	cityName: string;
	days: number;
}

export interface LocationParams {
	cityName: string;
}
