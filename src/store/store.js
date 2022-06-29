import { configureStore } from '@reduxjs/toolkit';

import mapComponentReducer from '../components/MapComponent/mapComponentSlice';

export const store = configureStore({
	reducer: {
		mapComponent: mapComponentReducer
	},
});