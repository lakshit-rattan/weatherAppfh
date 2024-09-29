import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { weatherReducer } from './reducers/weatherReducer';
import { weatherSaga } from './sagas/weatherSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
	yield all([weatherSaga()]);
}

export const store = configureStore({
	reducer: {
		weather: weatherReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: false,
			serializableCheck: false,
		}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
