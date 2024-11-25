import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SchoolType } from '@/types/index';

interface SchoolState {
  listSchool: SchoolType[];
}

const initialState: SchoolState = {
  listSchool: []
};

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    addSchool: (state, action: PayloadAction<SchoolType>) => {
      state.listSchool.push(action.payload);
    },
    fetchSchool: (state, action: PayloadAction<SchoolType[]>) => {
      state.listSchool = action.payload;
    }
  }
});

export const { addSchool, fetchSchool } = schoolSlice.actions;
const schoolReducer = schoolSlice.reducer;
export default schoolReducer;
