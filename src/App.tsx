import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingPage } from "./ui/components/LoadingPage";
import { PageNotFound } from "./ui/views/PageNotFound";
import { Layout } from "./ui/layout/Layout";
import { ContextProvider } from "./core";
import { CustomThemeProvider } from "./core/theme/Theme";

const Home = React.lazy(() => import("./ui/views/Home"));

const App = () => {
  return (
    <>
      <ContextProvider>
        <CustomThemeProvider>
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
        </CustomThemeProvider>
      </ContextProvider>
    </>
  );
};

export default App;
