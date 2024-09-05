import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-base-100 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        <Link to="/" className="text-lg font-bold">Interactive Stories</Link>
        <div>
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/create-story" className="btn btn-ghost">Create Story</Link>
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-ghost">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
















