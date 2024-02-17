import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: "Open Sans, sans-serif",
        headings: { fontFamily: "Poppins, sans-serif" },
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
