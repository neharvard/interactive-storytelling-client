
const About = () => {
    return (
        <div className="about-us ">
            {/* hero pic */}
            <div className="mt-24">

                <div className="hero max-w-screen   h-[500px] mx-auto" style={{ backgroundImage: 'url(https://i.ibb.co/vwp2S9j/abt.jpg)' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold text-red-500 font-serif">About Us</h1>
                            <p>
                                Discover Our Story: Unveiling the Passion and Purpose Behind Story Weave
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex mt-20'>
                <div className="ml-12 mr-12  mt-9">
                    <h2 className="text-center font-semibold font-serif text-2xl text-orange-400 mb-5">Our Story</h2>

                    <p className="text-lg">
                        Welcome to the heart of Story Weave, where our journey unfolds through a tapestry of passion and purpose. Our story began with a shared vision—to create a space where ideas flourish, insights inspire, and connections thrive.
                    </p>
                    <p className="text-lg">
                        Born from a love of creativity and exploration, our platform is a space where imagination knows no bounds. We believe that stories have the power to connect, inspire, and transform. Whether you are here to read gripping tales or craft your own, our platform opens the door to worlds untold. Every user becomes part of a growing community of storytellers, where each story has the potential to spark endless paths of discovery.
                    </p>
                    <br />
                    <p className="text-lg">
                        Our journey is not just about the stories we tell; it's about the community we're building—one reader at a time. We invite you to delve into our narrative, explore the motivations that drive us, and become part of the vibrant tapestry that is Story Weave. Together, let's continue to ignite curiosity and celebrate the beauty of shared knowledge and experiences. Welcome to our story, where every chapter is written with you in mind.
                    </p>
                </div>
                <div className="w-[1800px]">
                    <img src="https://i.ibb.co/S7jh7MD/our-story.jpg" alt="" />
                </div>
            </div>
            <div className="flex mt-5">
                <div className="w-[1900px]">
                    <img src="https://i.ibb.co/D534Yj2/mission.jpg" alt="" />
                </div>
                <div className="mt-12 ml-12 mr-12 ">
                    <h2 className="text-center font-semibold font-serif text-2xl text-orange-400 mb-4">Our Mission</h2>
                    <p className="text-lg">
                        Our mission is to empower creators to share interactive, branching narratives that engage and inspire readers. We strive to make storytelling more immersive by giving authors the tools to craft dynamic, multi-path stories, while providing readers the joy of choosing their adventure. We aim to bridge the gap between creators and audiences, offering insights to authors while delivering unforgettable experiences to every reader
                    </p>
                    <br />
                    <p className="text-lg">
                        Our commitment is rooted in the belief that information should not only inform but also empower. Through engaging and thought-provoking content, we aim to enrich the lives of our readers, providing them with the tools they need to navigate their interests, passions, and the ever-evolving world around them.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default About;