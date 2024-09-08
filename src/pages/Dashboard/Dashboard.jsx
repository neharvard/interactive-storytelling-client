import { useEffect, useState } from 'react';

function formatTime(seconds) {
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
    const [popularChoices, setPopularChoices] = useState([]);
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
                    setPopularChoices(data || []);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });

            // Fetch time spent insights
            // fetch(`http://localhost:5000/story/${selectedStoryId}/timeSpent`)
            //     .then(response => response.json())
            //     .then(data => {
            //         setTimeSpentInsights(data);
            //         setLoading(false);
            //     })
            //     .catch(error => {
            //         setError(error.message);
            //         setLoading(false);
            //     });

            // Fetch time spent insights when a story is selected


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
            <h1 className="text-5xl text-center font-bold mb-16 mt-20">Dashboard</h1>

            {/* Story Selection Dropdown */}
            <div className="mb-8">
                {/* <label htmlFor="storySelect" className="block text-lg font-medium text-gray-700 mb-2">Select a Story:</label> */}
                <select
                    id="storySelect"
                    name="storySelect"
                    className="select select-secondary w-full max-w-xs"
                    value={selectedStoryId || ''}
                    onChange={(e) => setSelectedStoryId(e.target.value)}
                >
                    <option className='text-lg font-medium' disabled value="">Select a Story</option>
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
                    <h2 className="text-2xl font-bold mb-4">Popular Path Choices</h2>
                    <div className="mb-8">
                        {popularChoices.length > 0 ? (
                            popularChoices.map((choice) => (
                                <p key={choice._id} className="text-lg">
                                    {choice._id} : {choice.count} Times Selected
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
                                    {insight.pathTitle} -
                                    {insight.averageTimeSpent !== null && insight.totalTimeSpent !== null
                                        ? `Average Time Spent: ${formatTime(insight.averageTimeSpent)} | Total Time Spent: ${formatTime(insight.totalTimeSpent)}`
                                        : "Nobody chose this path yet"}
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
