const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const timeStampToWeekDay = (timestamp) => {
    return days[new Date(timestamp * 1000).getDay()];
}
export const timeStampToHoursMinutes = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
}
