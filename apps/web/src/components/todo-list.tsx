"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { orpc, queryClient } from "@/utils/orpc"

export function TodoList() {
  const todos = useQuery(orpc.todo.getAll.queryOptions())

  const toggleMutation = useMutation(
    orpc.todo.toggle.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.todo.getAll.queryOptions())
      },
    })
  )

  const deleteMutation = useMutation(
    orpc.todo.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.todo.getAll.queryOptions())
      },
    })
  )

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleMutation.mutate({ id, completed: !completed })
  }

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate({ id })
  }

  if (todos.isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (todos.data?.length === 0) {
    return <p className="py-4 text-center">No todos yet. Add one above!</p>
  }

  return (
    <ul className="space-y-2">
      {todos.data?.map((todo) => (
        <li
          className="flex items-center justify-between rounded-md border p-2"
          key={todo.id}
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={todo.completed}
              id={`todo-${todo.id}`}
              onCheckedChange={() => handleToggleTodo(todo.id, todo.completed)}
            />
            <label
              className={`${todo.completed ? "text-muted-foreground line-through" : ""}`}
              htmlFor={`todo-${todo.id}`}
            >
              {todo.text}
            </label>
          </div>
          <Button
            aria-label="Delete todo"
            onClick={() => handleDeleteTodo(todo.id)}
            size="icon"
            variant="ghost"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  )
}
