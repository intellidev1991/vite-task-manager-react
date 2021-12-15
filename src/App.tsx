import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingPage } from "./ui/components/LoadingPage";
import { PageNotFound } from "./ui/views/PageNotFound";
import { Layout } from "./ui/layout/Layout";
import { ContextProvider } from "./core";

const Home = React.lazy(() => import("./ui/views/Home"));

const App = () => {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
};

export default App;
