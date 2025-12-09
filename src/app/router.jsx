import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import MainPage from "@/pages/MainPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "main", element: <MainPage /> },
        ],
    },
]);