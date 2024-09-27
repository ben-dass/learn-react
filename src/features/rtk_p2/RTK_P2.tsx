import { useAppSelector } from "@src/app/store.ts";
import { selectAllPosts } from "@features/rtk_p2/postsSlice.ts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@components/ui/card.tsx";
import { Link } from "react-router-dom";

const RTK_P2 = () => {
	const posts = useAppSelector(selectAllPosts);

	return (
		<>
			<section className="flex h-full w-full flex-row items-center justify-center gap-5 rounded-xl border p-3">
				{posts.map((post) => (
					<Card
						key={post.title}
						className="h-[9rem] w-[15rem]"
					>
						<CardHeader>
							<CardTitle>{post.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{post.content}</p>
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
};

export default RTK_P2;
