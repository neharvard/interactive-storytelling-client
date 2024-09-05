// const Login = () => {
//     return (
//       <div className="flex justify-center items-center h-screen bg-base-200">
//         <div className="card w-96 shadow-lg bg-base-100 p-8">
//           <h2 className="text-2xl font-bold">Login</h2>
//           <form>
//             <div className="form-control my-4">
//               <input type="email" placeholder="Email" className="input input-bordered" />
//             </div>
//             <div className="form-control my-4">
//               <input type="password" placeholder="Password" className="input input-bordered" />
//             </div>
//             <button className="btn btn-primary w-full">Login</button>
//           </form>
//         </div>
//       </div>
//     );
//   };
  
//   export default Login;


import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import img from '../../../images/login/login.svg'

import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';


const Login = () => {

    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log('location in the login page', location)

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        const photo = form.get("photo");

        // If userPhotoURL is null, use the default or placeholder URL
        // const photoURL = userPhotoURL ;
        console.log('login photo: ', photo);

        signIn(email, password, photo)
            .then(result => {
                console.log("login: ", result.user);

                // Navigate after login
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);

                // Display error message using toast
                toast.error('Login failed. Incorrect email or password.', { autoClose: 3000 });
            });
    }

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);              

                // navigate after login
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
            });
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            {/* <h2>This is login</h2> */}
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <span className='text-center'>Or</span>
                        {/* Add a Google login button */}
                        <div className="justify-center mt-4 border rounded-md
w-3/5 -mr-12 ml-14 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                            {/* <FaGoogle></FaGoogle> */}
                            <button
                                className="font-semibold py-2 px-4 rounded-md "
                                onClick={handleGoogleLogin}
                            >
                                {/* <img className="w-[30px] h-[20px] " src="https://i.ibb.co/bQd981w/revised-google.gif" alt="" /> */}
                                <span className='ml-5'>Loin with Google</span>
                            </button>
                        </div>
                    </div>
                    {/* Toast container */}
                    <ToastContainer position="top-right" autoClose={3000} />
                    <p className='my-7 text-center'>New to Blog Express
                        <Link className='text-orange-600 font-bold' to="/signup"> Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Login;
