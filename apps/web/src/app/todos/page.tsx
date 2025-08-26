import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TodoForm } from "@/components/todo-form";
import { TodoList } from "@/components/todo-list";

export default function TodosPage() {
	return (
		<div className="mx-auto w-full max-w-md py-10">
			<Card>
				<CardHeader>
					<CardTitle>Todo List</CardTitle>
					<CardDescription>Manage your tasks efficiently</CardDescription>
				</CardHeader>
				<CardContent>
					<TodoForm />
					<TodoList />
				</CardContent>
			</Card>
		</div>
	);
}
