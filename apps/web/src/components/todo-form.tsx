"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export function TodoForm() {
	const [newTodoText, setNewTodoText] = useState("");
	const queryClient = useQueryClient();

	const createMutation = useMutation(
		orpc.todo.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(orpc.todo.getAll.queryOptions());
				setNewTodoText("");
			},
		}),
	);

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTodoText.trim()) {
			createMutation.mutate({ text: newTodoText });
		}
	};

	return (
		<form
			onSubmit={handleAddTodo}
			className="mb-6 flex items-center space-x-2"
		>
			<Input
				value={newTodoText}
				onChange={(e) => setNewTodoText(e.target.value)}
				placeholder="Add a new task..."
				disabled={createMutation.isPending}
			/>
			<Button
				type="submit"
				disabled={createMutation.isPending || !newTodoText.trim()}
			>
				{createMutation.isPending ? (
					<Loader2 className="h-4 w-4 animate-spin" />
				) : (
					"Add"
				)}
			</Button>
		</form>
	);
}