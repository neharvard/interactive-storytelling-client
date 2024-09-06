import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CreateStory from "../pages/CreateStory/CreateStory";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/createStory',
                element: <CreateStory></CreateStory>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
              },
           
        ]
    }    
]);

export default router;