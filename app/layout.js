"use client";
import "react-toastify/dist/ReactToastify.css";
import "@/app/scss/components/custom-toastify.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "react-svg-map/lib/index.css";
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "./scss/app.scss";
import { Provider } from "react-redux";
import store from "../store";
import { AuthContextProvider } from "@/components/firebase/guard/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className="font-inter  custom-tippy dashcode-app">
          <ToastContainer />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <AuthContextProvider>
              <Provider store={store}>{children}</Provider>
            </AuthContextProvider>
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}
