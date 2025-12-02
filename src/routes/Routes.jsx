import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import Dashboard from "../pages/admin/dashbaord";
import Error from "../pages/public/error";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
        ]
    },
]);

export default router;