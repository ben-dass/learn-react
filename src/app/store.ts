import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import counterReducer from "@features/rtk_p1/counterSlice.ts";
import postsReducer from "@features/rtk_p2/postsSlice.ts";
import { apiSlice_rtkQuery } from "@features/rtk_query_p1/api/apiSlice.ts";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		posts: postsReducer,
		[apiSlice_rtkQuery.reducerPath]: apiSlice_rtkQuery.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice_rtkQuery.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
