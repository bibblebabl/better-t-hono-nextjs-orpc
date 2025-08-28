import type { RouterClient } from "@orpc/server"
import { o, publicProcedure } from "../lib/orpc"
import { todoRouter } from "./todo"

export const appRouter = o.router({
  healthCheck: publicProcedure.handler(async () => {
    return await {
      status: "ok",
    }
  }),
  todo: todoRouter,
})

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
