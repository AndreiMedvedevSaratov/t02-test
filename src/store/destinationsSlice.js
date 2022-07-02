import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useServerData } from '../server/useServerData';

const initialState = {
    destinations: [],
    destinationsStatus: 'inactive'
};

export const fetchDestinations = createAsyncThunk(
    'destinations/fetchDestinations',
    async () => {
        const { request } = useServerData();
        return await request('http://localhost:3001/destinations');
    }
);

export const destinationsSlice = createSlice({
    name: 'destinations',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchDestinations.pending, (state) => {
                state.destinationsStatus = 'loading';
            })

            .addCase(fetchDestinations.fulfilled, (state, action) => {
                state.destinations = action.payload;
                state.destinationsStatus = 'inactive';
            })

            .addCase(fetchDestinations.rejected, (state) => {
                state.destinationsStatus = 'error';
            })
    }
});

export default destinationsSlice.reducer;