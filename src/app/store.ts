import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import counterReducer from "@features/rtk_p1/counterSlice.ts";
import postsReducer from "@features/rtk_p2/postsSlice.ts";

export const store = configureStore({
	reducer: { counter: counterReducer, posts: postsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
