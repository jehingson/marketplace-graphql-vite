import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import store from "./store";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./contexts/JWTcontext";
import routes from "./routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql";
import RootErrorBoundary from "./components/RootErrorBoundary";

const ApiContext = () => {

  return (
    <ApolloProvider client={client}>
      <RootErrorBoundary>
        <ReduxProvider store={store}>
          <HelmetProvider>
            <StyledEngineProvider injectFirst>
              <AuthProvider>
                <StyledEngineProvider injectFirst>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Toaster position="top-center" />
                    <Outlet />
                  </ThemeProvider>
                </StyledEngineProvider>
              </AuthProvider>
            </StyledEngineProvider>
          </HelmetProvider>
        </ReduxProvider>
      </RootErrorBoundary>
    </ApolloProvider>
  );
};

const App: FC = () => {
  const router = createBrowserRouter([
    {
      element: <ApiContext />,
      children: routes,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
