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

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className="font-inter  custom-tippy dashcode-app">
          <ToastContainer />
          <Provider store={store}>{children}</Provider>
        </body>
      </html>
    </>
  );
}
