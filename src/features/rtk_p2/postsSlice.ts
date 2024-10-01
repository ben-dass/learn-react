import {
	createAsyncThunk,
	createSlice,
	isRejectedWithValue,
	nanoid,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/app/store.ts";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export interface IPost {
	id: string;
	title: string;
	body: string;
	reactions: {
		thumbsUp: number;
		wow: number;
		heart: number;
		rocket: number;
		coffee: number;
	};
}

export interface IPosts {
	posts: IPost[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | undefined;
}

const initialState: IPosts = {
	posts: [],
	status: "idle",
	error: "",
};

export const fetchPosts = createAsyncThunk<IPost[]>(
	"posts/fetchPosts",
	async () => {
		try {
			const response = await axios.get(POSTS_URL);
			return [...response.data];
		} catch (err) {
			throw isRejectedWithValue(err);
		}
	},
);

export const addNewPost = createAsyncThunk(
	"pasts/addNewPosts",
	async (initialPost) => {
		try {
			const response = await axios.post(POSTS_URL, initialPost);
			return response.data;
		} catch (err) {
			throw isRejectedWithValue(err);
		}
	},
);

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost: {
			reducer(state, action: PayloadAction<IPost>) {
				state.posts.push(action.payload);
			},
			prepare(title, body) {
				return {
					payload: {
						id: nanoid(),
						title,
						body,
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
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				const loadedPosts = action.payload.map((post: IPost) => {
					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					};
					return post;
				});
				state.posts = state.posts.concat(loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				action.payload.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};
				state.posts.push(action.payload);
			});
	},
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
