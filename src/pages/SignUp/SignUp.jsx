import { Link } from 'react-router-dom';
import img from '../../../images/login/login.svg'
import { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const { createUser } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        photo: "",
        email: "",
        password: ""
    });


    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, photo, email, password } = formData;


        // Password validation
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least one capital letter.");
            return;
        } else if (!/[^A-Za-z0-9]/.test(password)) {
            setPasswordError("Password must contain at least one special character.");
            return;
        }

        try {
            setPasswordError("");
            // Password meets validation criteria, proceed with registration
            await createUser(email, password, photo, name);
            console.log("Registration successful!");

            // Show a success toast message
            toast.success('Registration successful!', { autoClose: 3000 });

            // Clear the form fields
            setFormData({
                name: "",
                photo: "",
                email: "",
                password: ""
            });
            console.log('signUp photo: ', name, photo);

        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="hero min-h-screen bg-base-200 mt-14">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                        <form onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" name="name" className="input input-bordered" required value={formData.name} onChange={handleInputChange} />
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" required name="photo" placeholder="Photo URL" className="input input-bordered" value={formData.photo} onChange={handleInputChange} />
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                {passwordError && (
                                    <p className="text-red-500 mt-1">{passwordError}</p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                        <p className='my-4 text-center'>Already Have an Account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
                    </div>
                </div>
            </div>
            {/* Toast container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default SignUp;