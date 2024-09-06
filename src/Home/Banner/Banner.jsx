import img from '../../../images/Banner.jpg'

const Banner = () => {
    return (
        // <div className="hero min-h-screen mt-10" style={{ backgroundImage: 'url(https://i.ibb.co/bzj8bKj/Blogging.jpg)' }}>
        <div className="hero min-h-screen mt-10" style={{ backgroundImage: `url(${img})`}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold text-yellow-400">Hello there!!</h1>
                <p className="mb-5 font-medium">Welcome to a World of Endless Inspiration. Explore, Learn, and Share with Our Story.</p>
            </div>
        </div>
    </div>

    );
};

export default Banner;