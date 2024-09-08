import { useState, useEffect } from 'react';
import { formatTime } from '../formatTime';

const TimeTrack = () => {
    const [timeData, setTimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/story/interaction')
            .then(response => {
                if (!response.ok) {
                    console.error('Server error:', response.status, response.statusText);
                    throw new Error(`Failed to fetch interaction data: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Interaction data fetched:', data);
                setTimeData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);
    

    // useEffect(() => {
    //     fetch('http://localhost:5000/story/interaction')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch interaction data');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setTimeData(data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             setError(error.message);
    //             setLoading(false);
    //         });
    // }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-5">
            <h2 className="text-3xl font-semibold text-center mb-8">Time Spent on Each Story Path</h2>
            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Story Title</th>
                        <th className="px-4 py-2">Path Title</th>
                        <th className="px-4 py-2">Time Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {timeData.map((interaction) => (
                        <tr key={interaction._id}>
                            <td className="border px-4 py-2">{interaction.storyTitle}</td>
                            <td className="border px-4 py-2">{interaction.pathTitle}</td>
                            <td className="border px-4 py-2">{formatTime(interaction.timeSpent)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimeTrack;


