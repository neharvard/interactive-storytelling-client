import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AuthContext } from '../../pages/Providers/AuthProvider';


const AllStory = () => {
    const { user } = useContext(AuthContext);
    const [stories, setStories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStories, setFilteredStories] = useState([]);
    const [toastShown, setToastShown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch stories from backend
    useEffect(() => {
        fetch('http://localhost:5000/allStory') 
            .then((response) => response.json())
            .then((data) => {
                const sortedStories = data.sort((a, b) => b.timestamp - a.timestamp);
                setStories(sortedStories);
                setFilteredStories(sortedStories); // Initially set filtered stories to all stories
            })
            .catch((error) => console.error('Error:', error))
            .finally(() => setLoading(false)); // Set loading to false when data fetching is complete
    }, []);

    // Function to filter stories based on the search query
    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const matchingStories = stories.filter((story) =>
            story.title.toLowerCase().includes(query)
        );
        setFilteredStories(matchingStories);
    }, [searchQuery, stories]);

    useEffect(() => {
        // Check if the searchQuery is empty and the toast has been shown
        if (searchQuery === '' && toastShown) {
            setToastShown(false);
        }
    }, [searchQuery, toastShown]);

    // Function to handle search
    const handleSearch = () => {
        const matchingStories = stories.filter((story) =>
            story.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredStories(matchingStories);

        if (matchingStories.length === 0) {
            toast.error('No stories matching the search query');
            setToastShown(true);
        }
    };

    // Function to filter stories based on the selected category
    const filterByCategory = () => {
        if (selectedCategory) {
            const filteredByCategory = stories.filter((story) =>
                story.category === selectedCategory
            );

            setFilteredStories(filteredByCategory);
        } else {
            setFilteredStories(stories); // Show all stories if no category is selected
        }
    };

    return (
        <div className="mt-16 max-w-screen-xl mx-auto px-4 py-5"> 
            <h2 className="text-5xl text-center font-bold mb-16">All Stories</h2>
            <div className="flex items-center justify-center mb-24">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="input input-bordered mr-2 w-3/4 p-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="btn btn-active hover:bg-green-400 h-16"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <ToastContainer />
            <SkeletonTheme color="#b91c1c" highlightColor="#f97316">
                <div className="flex mb-4 gap-8">
                    <div className="w-1/5">
                        <h2 className="font-semibold mb-3">Filter</h2>
                        <select
                            className="select select-bordered"
                            value={selectedCategory}
                            onClick={filterByCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Mystery">Mystery</option>
                        </select>
                    </div>
                    <div className="4/5">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-7">
                                {[1, 2, 3, 4].map((index) => (
                                    <div key={index} className="card bg-base-100 shadow-xl">
                                        <Skeleton height={256} />
                                        <div className="card-body">
                                            <h3 className="text-2xl font-bold mb-3">
                                                <Skeleton />
                                            </h3>
                                            <p className="">
                                                <Skeleton count={3} />
                                            </p>
                                            <p className="font-semibold mb-1">
                                                <Skeleton />
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-7">
                                {filteredStories.map((story) => (
                                    <div key={story._id} className="card bg-base-100 shadow-xl">                                       
                                        <div className="card-body">
                                        <img src={story.photo} alt={story.title} className="h-64 object-cover w-full" />
                                            <h3 className="text-2xl font-bold mb-3">{story.title}</h3>
                                            <p className="">{story.descriptionShort}</p>
                                            <p className="font-semibold mb-1">Category: {story.category}</p>
                                            <div className="flex gap-3">
                                                <button>
                                                    <Link to={`/story/${story._id}`} className="btn btn-accent font-bold">
                                                        Read More
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default AllStory;
