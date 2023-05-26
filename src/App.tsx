import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CustomizationProvider } from "./contexts/CustomizationContext";
import { WithAxios } from "./contexts/WithAxios";
import { AppRoutes } from "./routes";
import { theme } from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomizationProvider>
          <WithAxios>
            <ThemeProvider theme={theme}>
              <StyledEngineProvider injectFirst>
                <BrowserRouter>
                  <ToastContainer
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="light"
                  />
                  <AppRoutes />
                </BrowserRouter>
              </StyledEngineProvider>
            </ThemeProvider>
          </WithAxios>
        </CustomizationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
