import { TodoForm } from "@/components/todo-form"
import { TodoList } from "@/components/todo-list"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"

export default async function TodosPage() {
  await requireAuth()

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
  )
}
