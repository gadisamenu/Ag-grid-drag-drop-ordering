"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import Layout from "./common/Layout";
import { ThemeProvider } from "./theme-provider";
import { PersistGate } from "redux-persist/integration/react";
type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
