
export const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let formattedTime = '';
    if (hrs > 0) formattedTime += `${hrs} hour${hrs > 1 ? 's' : ''} `;
    if (mins > 0) formattedTime += `${mins} min${mins > 1 ? 's' : ''} `;
    if (secs > 0 || formattedTime === '') formattedTime += `${secs} sec${secs > 1 ? 's' : ''}`;

    return formattedTime.trim();
};
