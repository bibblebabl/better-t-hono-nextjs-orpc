import type { RouterClient } from '@orpc/server';
import { o } from '../lib/orpc';
import { todoRouter } from './todo';

export const appRouter = o.router({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
