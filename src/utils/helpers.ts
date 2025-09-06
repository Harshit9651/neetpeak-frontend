// Calculate percentage of completion
export const getProgressPercentage = (completed: number, total: number): number => {
  if (!total || total === 0) return 0;
  const percentage = Math.round((completed / total) * 100);
  return percentage > 100 ? 100 : percentage;
};

// Return tailwind gradient class based on progress
export const getProgressGradient = (percentage: number): string => {
  if (percentage === 100) {
    return 'from-emerald-400 via-emerald-500 to-emerald-600';
  } else if (percentage >= 75) {
    return 'from-blue-400 via-blue-500 to-blue-600';
  } else if (percentage >= 50) {
    return 'from-yellow-400 via-yellow-500 to-yellow-600';
  } else {
    return 'from-orange-400 via-orange-500 to-orange-600';
  }
};

// Return tailwind text color based on progress
export const getProgressColor = (percentage: number): string => {
  if (percentage === 100) {
    return 'text-emerald-600';
  } else if (percentage >= 75) {
    return 'text-blue-600';
  } else if (percentage >= 50) {
    return 'text-yellow-600';
  } else {
    return 'text-orange-600';
  }
};

// Format duration (in seconds or milliseconds) to mm:ss or hh:mm:ss
export const formatDuration = (duration: number): string => {
  // If duration > 10000, assume it's in milliseconds
  const totalSeconds = duration > 10000 ? Math.floor(duration / 1000) : duration;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
};
