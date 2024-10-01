import { useAppDispatch, useAppSelector } from "@src/app/store.ts";
import {
	fetchPosts,
	getPostsError,
	getPostsStatus,
	selectAllPosts,
} from "@features/rtk_p2/postsSlice.ts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@components/ui/card.tsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const RTK_P2 = () => {
	const posts = useAppSelector(selectAllPosts);
	const postsStatus = useAppSelector(getPostsStatus);
	const postsError = useAppSelector(getPostsError);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);

	if (postsStatus === "loading") {
		return <p>Loading...</p>;
	} else if (postsStatus === "failed") {
		return <p>{postsError}</p>;
	} else {
		return (
			<>
				<section className="flex h-full w-full flex-row flex-wrap items-center justify-center gap-5 rounded-xl border border-gray-100 p-3">
					{posts.map((post) => (
						<Card
							key={post.title}
							className="h-[9rem] w-[15rem]"
						>
							<CardHeader>
								<CardTitle>{post.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{post.body}</p>
							</CardContent>
						</Card>
					))}
				</section>
				<Link
					className="flex h-[2rem] w-full flex-row items-center justify-center gap-5 rounded-md bg-black pb-1 pt-1 text-sm text-gray-100 transition-all duration-200 ease-in-out hover:opacity-85"
					to="add_post"
				>
					+ Add Post
				</Link>
			</>
		);
	}
};

export default RTK_P2;
