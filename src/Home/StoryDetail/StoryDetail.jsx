// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const StoryDetail = () => {
//     const { _id } = useParams();
//     const [story, setStory] = useState(null);
//     const [selectedPath, setSelectedPath] = useState(null); // State to store the selected path
//     const [startTime, setStartTime] = useState(Date.now());
//     const [error, setError] = useState(null); 

//     useEffect(() => {
//         fetch(`http://localhost:5000/story/${_id}`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch story');
//                 }
//                 return response.json();
//             })
//             .then((data) => setStory(data))
//             .catch((error) => setError(error.message));

//         return () => {
//             const timeSpent = Date.now() - startTime;
//             if (story) {
//                 fetch(`http://localhost:5000/story/interaction`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         _id: story._id,
//                         pathTitle: selectedPath,
//                         timeSpent,
//                     }),
//                 }).catch((error) => console.error('Error:', error));
//             }
//         };
//     }, [_id, selectedPath, startTime, story]);

//     const handlePathSelection = (pathTitle) => {
//         setSelectedPath(pathTitle);
//     };

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!story) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-5">
//             <h1 className="text-4xl font-mono text-teal-400 text-center mt-24 mb-12">{story.title}</h1>
//             <img src={story.photo} alt={story.title} className="w-[1100px] h-[600px] ml-40 mb-4" />
//             <p className="text-xl mt-14 mb-4">{story.descriptionShort}</p>
//             <div className="text-xl">
//                 {story.storyPaths.map((path, index) => (
//                     <div key={index} className="mb-4 ">
//                         <div className='flex gap-6'>
//                         <p className='mt-3'>Option: {index+1}</p>
//                         <button 
//                             className={`btn ${selectedPath === path.pathTitle ? 'btn-primary' : 'btn-outline'} btn-info mb-3`}
//                             onClick={() => handlePathSelection(path.pathTitle)}
//                         >
//                             {path.pathTitle}
//                         </button>
//                         </div>

//                         {selectedPath === path.pathTitle && (
//                             <p className="mt-2">{path.pathDescription}</p>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default StoryDetail;


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StoryDetail = () => {
    const { _id } = useParams();
    const [story, setStory] = useState(null);
    const [selectedPath, setSelectedPath] = useState(null); // State to store the selected path
    const [startTime, setStartTime] = useState(Date.now());
    const [error, setError] = useState(null);

    useEffect(() => {
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
            if (story) {
                fetch(`http://localhost:5000/story/interaction`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id: story._id,
                        pathTitle: selectedPath,
                        timeSpent,
                    }),
                }).catch((error) => console.error('Error:', error));
            }
        };
    }, [_id, selectedPath, startTime, story]);

    const handlePathSelection = (pathTitle) => {
        setSelectedPath(pathTitle);
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
            {/* Added Category */}
            <p className="text-lg font-semibold text-gray-600 mb-6">Category: {story.category}</p>
            <div className="text-xl">
                {story.storyPaths.map((path, index) => (
                    <div key={index} className="mb-4">
                        <div className='flex gap-6'>
                            <p className='mt-3'>Option: {index + 1}</p>
                            <button
                                className={`btn ${selectedPath === path.pathTitle ? 'btn-primary' : 'btn-outline'} btn-info mb-3`}
                                onClick={() => handlePathSelection(path.pathTitle)}    
                            >
                                {path.pathTitle}
                            </button>
                        </div>
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
