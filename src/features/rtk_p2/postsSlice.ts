import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store.ts";

export interface IPost {
	id?: number;
	title: string;
	content: string;
}

const initialState: IPost[] = [
	{
		id: 1,
		title: "Learning Redux ToolKit",
		content: "Some content on learning redux toolkit",
	},
	{
		id: 2,
		title: "Slices...",
		content: "Some content on slices",
	},
];

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost(state, action: PayloadAction<IPost>) {
			state.push(action.payload);
		},
	},
});

export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
