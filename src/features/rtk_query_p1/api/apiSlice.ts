import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from "@features/rtk_query_p1/RTK_Query_P1.tsx";

export const apiSlice_rtkQuery = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
	tagTypes: ["Todos"],
	endpoints: (builder) => ({
		getTodos: builder.query({
			query: () => "/todos",
			transformResponse: (res: ITodo[]) =>
				res.sort((a, b) => b.id - a.id),
			providesTags: ["Todos"],
		}),
		addTodo: builder.mutation({
			query: (todo) => ({
				url: "/todos",
				method: "POST",
				body: todo,
			}),
			invalidatesTags: ["Todos"],
		}),
		updateTodo: builder.mutation({
			query: (todo) => ({
				url: `/todos/${todo.id}`,
				method: "PATCH",
				body: todo,
			}),
			invalidatesTags: ["Todos"],
		}),
		deleteTodo: builder.mutation({
			query: ({ id }) => ({
				url: `/todos/${id}`,
				method: "DELETE",
				body: id,
			}),
			invalidatesTags: ["Todos"],
		}),
	}),
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = apiSlice_rtkQuery;
