import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	startPoint: [],
	destinationPoint: [],
};

export const mapComponentReducer = createSlice({
	name: 'mapComponent',
	initialState,

	reducers: {
		changeInAddress: (state, action) => {
			if (action.payload.startPoint) {
				state.startPoint = action.payload.startPoint;
			}
			
			if (action.payload.destinationPoint) {
				state.destinationPoint = action.payload.destinationPoint;
			}
		}
	}
});

export const { changeInAddress } = mapComponentReducer.actions;

export default mapComponentReducer.reducer;