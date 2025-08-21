import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SortDirection = "asc" | "desc";

export interface SortItem {
  key: string;
  direction: SortDirection;
}

interface SortState {
  sorts: SortItem[];
}

const initialState: SortState = {
  sorts: [],
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSorts: (state, action: PayloadAction<SortItem[]>) => {
      state.sorts = action.payload;
    },
    addSort: (state, action: PayloadAction<SortItem>) => {
      if (!state.sorts.find((s) => s.key === action.payload.key)) {
        state.sorts.push(action.payload);
      }
    },
    updateSort: (state, action: PayloadAction<{ index: number; direction: SortDirection }>) => {
      const { index, direction } = action.payload;
      if (state.sorts[index]) {
        state.sorts[index].direction = direction;
      }
    },
    removeSort: (state, action: PayloadAction<number>) => {
      state.sorts.splice(action.payload, 1);
    },
    reorderSorts: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      if (from === to) return;
      const updated = [...state.sorts];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      state.sorts = updated;
    },
    clearSorts: (state) => {
      state.sorts = [];
    },
  },
});

export const { setSorts, addSort, updateSort, removeSort, reorderSorts, clearSorts } =
  sortSlice.actions;

export default sortSlice.reducer;
