import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "app/store";
import { fetchCourse } from "features/search/searchAPI";

export interface SearchState {
  data: any[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: SearchState = {
  data: [],
  status: 'idle'
};

export const searchAsync = createAsyncThunk(
  'search/fetchCourse',
  async (data: any) => {
    const response = await fetchCourse(data);
    console.log(response);
    return response.data;
  }
);


export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchAsync.fulfilled, (state, action: PayloadAction<[]>) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(searchAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectData = (state: RootState) => state.search.data
export const selectStatus = (state: RootState) => state.search.status

export default searchSlice.reducer;
