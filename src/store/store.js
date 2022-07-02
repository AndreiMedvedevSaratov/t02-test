import { configureStore } from '@reduxjs/toolkit';

import mapComponentReducer from './mapComponentSlice';
import requestsReducer from './requestListSlice';
import destinationsSlice from '../components/TableWithRequests/addressesSlice';

export const store = configureStore({
	reducer: {
		mapComponent: mapComponentReducer,
		requests: requestsReducer,
		addresses: destinationsSlice,
	},
});