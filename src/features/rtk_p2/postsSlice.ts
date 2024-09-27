import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store.ts";

export interface IPost {
	id: string;
	title: string;
	content: string;
	reactions: {
		thumbsUp: number;
		wow: number;
		heart: number;
		rocket: number;
		coffee: number;
	};
}

const initialState: IPost[] = [
	{
		id: "1",
		title: "Learning Redux ToolKit",
		content: "Some content on learning redux toolkit",
		reactions: {
			thumbsUp: 2,
			wow: 1,
			heart: 3,
			rocket: 1,
			coffee: 3,
		},
	},
	{
		id: "2",
		title: "Slices...",
		content: "Some content on slices",
		reactions: {
			thumbsUp: 1,
			wow: 33,
			heart: 2,
			rocket: 3,
			coffee: 54,
		},
	},
];

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost: {
			reducer(state, action: PayloadAction<IPost>) {
				state.push(action.payload);
			},
			prepare(title, content) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				};
			},
		},
	},
});

export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
