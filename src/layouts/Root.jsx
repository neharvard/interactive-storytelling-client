import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";


const Root = () => {
    return (
        <div className="max-w-6xl mx-auto font-poppins">
            <Navbar></Navbar>
            <Outlet></Outlet>      
        </div>
    );
};

export default Root;