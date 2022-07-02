import { configureStore } from '@reduxjs/toolkit';

import mapComponentReducer from './mapComponentSlice';
import requestsReducer from './tableWithRequestsSlice';
import destinationsSlice from './destinationsSlice';

export const store = configureStore({
	reducer: {
		mapComponent: mapComponentReducer,
		requests: requestsReducer,
		destinations: destinationsSlice,
	},
});