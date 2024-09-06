// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-base-100 shadow-md">
//       <div className="container mx-auto px-4 py-4 flex justify-between">
//         <Link to="/" className="text-lg font-bold">Interactive Stories</Link>
//         <div>
//           <Link to="/" className="btn btn-ghost">Home</Link>
//           <Link to="/create-story" className="btn btn-ghost">Create Story</Link>
//           <Link to="/login" className="btn btn-ghost">Login</Link>
//           <Link to="/register" className="btn btn-ghost">Register</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;






import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../pages/Providers/AuthProvider";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    // console.log('navbar user: ', user);
 
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }
    const navLinks = <>
        <li className="font-bold text-base"><NavLink to='/'>Home</NavLink></li>
        <li className="font-bold text-base"><NavLink to="/createStory">Create Story</NavLink></li>
    </>

    return (
      
        <div className="navbar bg-base-100 mt-7">
       
            {/* <h2>THIS is Navar</h2> */}
            <div className="navbar-start">
                <div className="flex gap-5">
                    {/* <FaBloggerB></FaBloggerB> */}
                    <p className="text-4xl ml-8 font-extrabold italic font-serif">
                        <span className="text-pink-400">Story</span> Weave</p>
                </div>
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">

                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src='https://i.ibb.co/Q6KWgsc/user.png' />
                    </div>
                </label>
                {
                    user ? (
                        <>
                            <button
                                onClick={handleLogOut}
                                className="btn">Log Out</button>
                        </>
                    ) : (
                        <Link to='/login'>
                            <button className="btn font-sans font-bold">Login</button>
                        </Link>
                    )
                }
            
                {/* new add */}
                <button //onClick={toggleTheme} 
                    className="ml-4 btn btn-circle theme-toggle">
                    <FiSun />  <FiMoon />
                </button>

                {/* <label className="grid cursor-pointer place-items-center">
  <input
    type="checkbox"
    value="synthwave"
    className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1" />
  <svg
    className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
  <svg
    className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</label>
                */}


            </div>
        </div>
    );
};

export default Navbar;


























