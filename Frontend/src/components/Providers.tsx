"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import Layout from "./common/Layout";
import { PersistGate } from "redux-persist/integration/react";
type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>{children}</Layout>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
