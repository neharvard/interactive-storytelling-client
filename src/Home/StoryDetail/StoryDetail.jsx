import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StoryDetail = () => {
    const { _id } = useParams();
    const [story, setStory] = useState(null);
    const [selectedPath, setSelectedPath] = useState(null); 
    const [startTime, setStartTime] = useState(Date.now());
    const [error, setError] = useState(null);


    useEffect(() => {
        // Check if _id is a valid 24-character hex string
        if (!_id || _id.length !== 24) {
            setError('Invalid story ID');
            return;
        }
    
        fetch(`http://localhost:5000/story/${_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch story');
                }
                return response.json();
            })
            .then((data) => setStory(data))
            .catch((error) => setError(error.message));
        
        return () => {
            const timeSpent = Date.now() - startTime;
            if (story && selectedPath) {
                // Ensure all fields are correct here
                fetch(`http://localhost:5000/story/interaction`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        storyId: _id, // Ensure this is a valid 24-character hex string
                        pathTitle: selectedPath,
                        timeSpent: formatTime(timeSpent), // Call formatTime to convert ms to proper format
                    }),
                }).catch((error) => console.error('Error:', error));
            }
        };
    }, [_id, selectedPath, startTime, story]);
    

    // useEffect(() => {
    //     fetch(`http://localhost:5000/story/${_id}`)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch story');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => setStory(data))
    //         .catch((error) => setError(error.message));

    //     return () => {
    //         const timeSpent = Date.now() - startTime;
    //         if (story && selectedPath) {
    //             // Ensure all fields are correct here
    //             fetch(`http://localhost:5000/story/interaction`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     storyId: _id, // Ensure this is a valid 24-character hex string
    //                     pathTitle: selectedPath,
    //                     timeSpent: formatTime(timeSpent), // Call formatTime to convert ms to proper format
    //                 }),
    //             }).catch((error) => console.error('Error:', error));
    //         }
    //     };
    // }, [_id, selectedPath, startTime, story]);

    const handlePathSelection = (pathTitle) => {
        setSelectedPath(pathTitle);
        const timeSpent = Date.now() - startTime;

        // Post the user's choice to the backend
        fetch(`http://localhost:5000/story/trackChoices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storyId: _id,
                pathTitle: pathTitle,
                userId: 'someUserId', // Add if necessary
            }),
        }).catch((error) => console.error('Error:', error));

        // Record the time spent on the path
        fetch(`http://localhost:5000/story/interaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storyId: _id,
                pathTitle: pathTitle,
                timeSpent: formatTime(timeSpent),
            }),
        }).catch((error) => console.error('Error:', error));

        // Reset startTime after a path is selected
        setStartTime(Date.now());
    };

    // Function to format time into "1 hour 1 min 1 sec" format
    const formatTime = (milliseconds) => {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        return `${hours > 0 ? `${hours} hour ` : ''}${minutes > 0 ? `${minutes} min ` : ''}${seconds} sec`;
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!story) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-5">
            <h1 className="text-4xl font-mono text-teal-400 text-center mt-24 mb-12">{story.title}</h1>
            <img src={story.photo} alt={story.title} className="w-[1100px] h-[600px] ml-40 mb-4" />
            <p className="text-xl mt-14 mb-4">{story.descriptionShort}</p>
            <p className="text-lg font-semibold text-gray-600 mb-6">Category: {story.category}</p>
            <div className="text-xl">
                {story.storyPaths.map((path, index) => (
                    <div key={index} className="mb-4">
                        <button
                            className={`btn ${selectedPath === path.pathTitle ? 'btn-primary' : 'btn-outline'} btn-info mb-3`}
                            onClick={() => handlePathSelection(path.pathTitle)}
                        >
                            {path.pathTitle}
                        </button>
                        {selectedPath === path.pathTitle && (
                            <p className="mt-2">{path.pathDescription}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoryDetail;
