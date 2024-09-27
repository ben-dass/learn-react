import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@components/ui/form.tsx";
import { Button } from "@components/ui/button.tsx";
import { Input } from "@components/ui/input.tsx";
import { useAppDispatch } from "@src/app/store.ts";
import { addPost } from "@features/rtk_p2/postsSlice.ts";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
	postTitle: z.string().min(2).max(50),
	postContent: z.string().min(2).max(200),
});

const AddPostForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			postTitle: "",
			postContent: "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		dispatch(
			addPost({ title: values.postTitle, content: values.postContent }),
		);
		navigate("..");
	};

	return (
		<div className="w-[30rem]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						name="postTitle"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<FormLabel>Title</FormLabel>
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter the title of your post here..."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is what everyone will see.
								</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						name="postContent"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<FormLabel>Content</FormLabel>
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter the content of your post here..."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is the description of your post.
								</FormDescription>
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full"
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default AddPostForm;
