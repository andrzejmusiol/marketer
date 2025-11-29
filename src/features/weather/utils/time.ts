export const formatTime = (timestamp: number, timezone: number) =>
    new Date(timestamp * 1000 + timezone * 1000).toISOString().slice(11, 16)