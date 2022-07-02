import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useServerData } from '../server/useServerData';

const requestsAdapter = createEntityAdapter();

const initialState = requestsAdapter.getInitialState({
    requestsLoadingStatus: 'inactive'
});

export const fetchRequests = createAsyncThunk(
    'requests/fetchRequests',
    async () => {
        const { request } = useServerData();
        return await request('http://localhost:3002/requests');
    }
);

export const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        requestItemUpdated: requestsAdapter.updateOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequests.pending, (state) => {
                state.requestsLoadingStatus = 'loading';
            })

            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.requestsLoadingStatus = 'inactive';
                requestsAdapter.setAll(state, action.payload);
            })
            
            .addCase(fetchRequests.rejected, (state) => {
                state.requestsLoadingStatus = 'error';
            })
    }
});

export const { selectAll } = requestsAdapter.getSelectors((state) => state.requests);

export const { requestItemUpdated } = requestsSlice.actions;

export default requestsSlice.reducer;