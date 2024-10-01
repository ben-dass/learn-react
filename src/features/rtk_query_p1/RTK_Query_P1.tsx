import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form.tsx";
import { Input } from "@components/ui/input.tsx";
import { Button } from "@components/ui/button.tsx";
import {
	useAddTodoMutation,
	useDeleteTodoMutation,
	useGetTodosQuery,
	useUpdateTodoMutation,
} from "@features/rtk_query_p1/api/apiSlice.ts";

export interface ITodo {
	userId: number;
	id: string;
	title: string;
	completed: boolean;
}

const formSchema = z.object({
	todo: z.string().min(2).max(50),
});

const RTK_Query_P1 = () => {
	const {
		data: todos,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTodosQuery({});
	const [addTodo] = useAddTodoMutation();
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			todo: "",
		},
	});

	const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
		addTodo({ userId: 1, title: values.todo, completed: false });
	};

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isError) {
		content = <p>Error: {error?.toString()}</p>;
	} else if (isSuccess) {
		content = (
			<div className="mb-5 rounded-xl border border-gray-200 p-2">
				{todos.map((todo: ITodo) => (
					<div
						key={todo.id}
						className={`flex justify-between ${todo.completed ? "opacity-30" : ""}`}
					>
						<span>{todo.title}</span>
						&nbsp;
						<span className="text-xs font-bold uppercase opacity-70">
							{todo.completed ? "completed" : "incomplete"}
						</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleOnSubmit)}>
					<div className="flex flex-row gap-2">
						<FormField
							control={form.control}
							name="todo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Enter a new <b>Todo</b> item
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Get brocolli"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-end">
							<Button
								className="mt-5"
								type="submit"
							>
								+
							</Button>
						</div>
					</div>
				</form>
			</Form>
			<div>{content}</div>
		</>
	);
};

export default RTK_Query_P1;
