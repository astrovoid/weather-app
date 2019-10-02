import React from "react";
import ReactDOM from "react-dom";
import { App } from "./containers/App";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router5";
import { RematchRootState } from "@rematch/core";
import { configureStore } from "./store/configureStore";
import { configureRouter } from "./routes/configureRouter";
import { persistPlugin } from "./store/plugins";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import * as models from "./store/models";
import './index.sass';

const router = configureRouter();
const store = configureStore(router, models, [persistPlugin]);

router.start();

const persistor = getPersistor();

ReactDOM.render(
  <PersistGate persistor={persistor}>
    <Provider store={store} key="provider">
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </PersistGate>,
  document.getElementById("root")
);

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type iRootState = RematchRootState<typeof models>;
