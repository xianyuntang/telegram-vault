import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isAuth: boolean;
}

const initialState: AppState = {
  isAuth: false,
};

interface SetIsAuthPayload {
  isAuth: boolean;
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<SetIsAuthPayload>) {
      state.isAuth = action.payload.isAuth;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuth } = appSlice.actions;

export default appSlice.reducer;
