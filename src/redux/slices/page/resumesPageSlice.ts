import { ResumesPageFilter } from "@/types/state.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ResumesPageSlice = {
  filter: ResumesPageFilter;
};

const initialState: ResumesPageSlice = {
  filter: {
    tags: [],
  },
};

export const resumesPageSlice = createSlice({
  name: "resumesPage",
  initialState,
  reducers: {
    addTagToFilter(state, action: PayloadAction<string>) {
      state.filter.tags.unshift(action.payload);
    },
    removeTagFromFilter(state, action: PayloadAction<string>) {
      state.filter.tags.unshift(action.payload);
    },
    setTagFilter(state, action: PayloadAction<string[]>) {
      state.filter.tags = action.payload;
    },
  },
});

export default resumesPageSlice;
