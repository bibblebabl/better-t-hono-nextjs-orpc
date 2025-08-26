"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export function TodoList() {
	const queryClient = useQueryClient();
	
	const todos = useQuery(orpc.todo.getAll.queryOptions());
	
	const toggleMutation = useMutation(
		orpc.todo.toggle.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(orpc.todo.getAll.queryOptions());
			},
		}),
	);
	
	const deleteMutation = useMutation(
		orpc.todo.delete.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(orpc.todo.getAll.queryOptions());
			},
		}),
	);

	const handleToggleTodo = (id: number, completed: boolean) => {
		toggleMutation.mutate({ id, completed: !completed });
	};

	const handleDeleteTodo = (id: number) => {
		deleteMutation.mutate({ id });
	};

	if (todos.isLoading) {
		return (
			<div className="flex justify-center py-4">
				<Loader2 className="h-6 w-6 animate-spin" />
			</div>
		);
	}

	if (todos.data?.length === 0) {
		return <p className="py-4 text-center">No todos yet. Add one above!</p>;
	}

	return (
		<ul className="space-y-2">
			{todos.data?.map((todo) => (
				<li
					key={todo.id}
					className="flex items-center justify-between rounded-md border p-2"
				>
					<div className="flex items-center space-x-2">
						<Checkbox
							checked={todo.completed}
							onCheckedChange={() =>
								handleToggleTodo(todo.id, todo.completed)
							}
							id={`todo-${todo.id}`}
						/>
						<label
							htmlFor={`todo-${todo.id}`}
							className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}
						>
							{todo.text}
						</label>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => handleDeleteTodo(todo.id)}
						aria-label="Delete todo"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</li>
			))}
		</ul>
	);
}