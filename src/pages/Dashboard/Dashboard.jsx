import { useEffect, useState } from 'react';

function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const hoursDisplay = hours > 0 ? `${hours}h ` : '';
    const minutesDisplay = minutes > 0 ? `${minutes}m ` : '';
    const secondsDisplay = secs > 0 ? `${secs}s` : '';

    return `${hoursDisplay}${minutesDisplay}${secondsDisplay}`;
}


const Dashboard = () => {
    const [stories, setStories] = useState([]);
    const [selectedStoryId, setSelectedStoryId] = useState(null);
    const [popularChoices, setPopularChoices] = useState({});
    const [timeSpentInsights, setTimeSpentInsights] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch all stories
    useEffect(() => {
        fetch('http://localhost:5000/allStory')
            .then(response => response.json())
            .then(data => setStories(data))
            .catch(error => setError(error.message));
    }, []);

    // Fetch data when a story is selected
    useEffect(() => {
        if (selectedStoryId) {
            setLoading(true);

            // Fetch popular choices
            fetch(`http://localhost:5000/story/${selectedStoryId}/popularity`)
                .then(response => response.json())
                .then(data => {
                    setPopularChoices(data ? data.choices : {});
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });

            // Fetch time spent insights
            fetch(`http://localhost:5000/story/${selectedStoryId}/timeSpent`)
                .then(response => response.json())
                .then(data => {
                    setTimeSpentInsights(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [selectedStoryId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-5">
            <h1 className="text-4xl font-mono text-teal-400 text-center mt-24 mb-12">Dashboard</h1>

            {/* Story Selection Dropdown */}
            <div className="mb-8">
                <label htmlFor="storySelect" className="block text-lg font-medium text-gray-700">Select a Story:</label>
                <select
                    id="storySelect"
                    name="storySelect"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                    value={selectedStoryId || ''}
                    onChange={(e) => setSelectedStoryId(e.target.value)}
                >
                    <option value="">-- Select a story --</option>
                    {stories.map((story) => (
                        <option key={story._id} value={story._id}>{story.title}</option>
                    ))}
                </select>
            </div>

            {/* Display Loading State */}
            {loading && <div>Loading...</div>}

            {/* Display Insights if a story is selected */}
            {selectedStoryId && !loading && (
                <>
                    <h2 className="text-2xl font-bold mb-4">Popular Choices</h2>
                    <div className="mb-8">
                        {popularChoices && Object.keys(popularChoices).length > 0 ? (
                            Object.entries(popularChoices).map(([pathTitle, count]) => (
                                <p key={pathTitle} className="text-lg">
                                    {pathTitle}: {count} selections
                                </p>
                            ))
                        ) : (
                            <p>No popular choice data available.</p>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold mb-4">Time Spent Insights</h2>
                    <div>
                        {timeSpentInsights && timeSpentInsights.length > 0 ? (
                            timeSpentInsights.map((insight, index) => (
                                <p key={index} className="text-lg">
                                    {insight._id} - Average Time Spent: {formatTime(insight.averageTimeSpent)} | Total Time Spent: {formatTime(insight.totalTimeSpent)}
                                </p>
                            ))
                        ) : (
                            <p>No time spent data available.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;







// import { useEffect, useState } from 'react';

// const Dashboard = ({ storyId }) => {
//     const [popularChoices, setPopularChoices] = useState({});
//     const [timeSpentInsights, setTimeSpentInsights] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Fetch popular choices
//     useEffect(() => {
//         if (storyId) {
//             fetch(`http://localhost:5000/story/${storyId}/popularity`)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch popular choices');
//                     }
//                     return response.json();
//                 })
//                 .then((data) => {
//                     setPopularChoices(data ? data.choices : {}); // Ensure choices are accessed correctly
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     setError(error.message);
//                     setLoading(false);
//                 });
//         }
//     }, [storyId]);

//     // Fetch time spent insights
//     useEffect(() => {
//         if (storyId) {
//             fetch(`http://localhost:5000/story/${storyId}/timeSpent`)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch time spent insights');
//                     }
//                     return response.json();
//                 })
//                 .then((data) => {
//                     setTimeSpentInsights(data);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     setError(error.message);
//                     setLoading(false);
//                 });
//         }
//     }, [storyId]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-5">
//             <h1 className="text-4xl font-mono text-teal-400 text-center mt-24 mb-12">Dashboard</h1>

//             <h2 className="text-2xl font-bold mb-4">Popular Choices</h2>
//             <div className="mb-8">
//                 {Object.keys(popularChoices).length > 0 ? (
//                     Object.entries(popularChoices).map(([pathTitle, count]) => (
//                         <p key={pathTitle} className="text-lg">
//                             {pathTitle}: {count} selections
//                         </p>
//                     ))
//                 ) : (
//                     <p>No popular choice data available.</p>
//                 )}
//             </div>

//             <h2 className="text-2xl font-bold mb-4">Time Spent Insights</h2>
//             <div>
//                 {timeSpentInsights.length > 0 ? (
//                     timeSpentInsights.map((insight, index) => (
//                         <p key={index} className="text-lg">
//                             {insight._id} - Average Time Spent: {Math.round(insight.averageTimeSpent / 1000)} seconds | Total Time Spent: {Math.round(insight.totalTimeSpent / 1000)} seconds
//                         </p>
//                     ))
//                 ) : (
//                     <p>No time spent data available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
