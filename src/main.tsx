import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import AppProvider from "@/context/appProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
