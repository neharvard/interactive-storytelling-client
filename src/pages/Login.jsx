const Login = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <div className="card w-96 shadow-lg bg-base-100 p-8">
          <h2 className="text-2xl font-bold">Login</h2>
          <form>
            <div className="form-control my-4">
              <input type="email" placeholder="Email" className="input input-bordered" />
            </div>
            <div className="form-control my-4">
              <input type="password" placeholder="Password" className="input input-bordered" />
            </div>
            <button className="btn btn-primary w-full">Login</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  
