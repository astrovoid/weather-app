import { Middleware } from "redux";
import { createLogger } from "redux-logger";
import { router5Middleware } from "redux-router5";
import { Router } from "router5";
import { init as initStore, Models } from "@rematch/core";
import { router5Reducer } from "redux-router5";
export interface IStore {
  router: Router;
}

export function configureStore(
  router: Router,
  models: Models,
  plugins: any[],
  initialState?: Partial<IStore>
): any {
  const middlewares: Middleware[] = [router5Middleware(router), createLogger()];

  const store = initStore({
    models: {
      ...models
    },
    redux: {
      initialState,
      reducers: {
        router: router5Reducer
      },
      middlewares,
    },
    plugins
  });

  return store;
}
