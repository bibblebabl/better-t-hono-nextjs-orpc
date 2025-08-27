import type { RouterClient } from '@orpc/server';
import { o, protectedProcedure, publicProcedure } from '../lib/orpc';
import { todoRouter } from './todo';

export const appRouter = o.router({
  healthCheck: o.handler(() => {
    return 'OK';
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    };
  }),
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
