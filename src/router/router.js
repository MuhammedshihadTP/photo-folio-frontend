import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";





export const router =createBrowserRouter([
    {path:'/login' ,element:<Login/>},
    {path:'/signup' ,element:<SignUp/>},
    {path:'/' ,element:<Home/>}

])
