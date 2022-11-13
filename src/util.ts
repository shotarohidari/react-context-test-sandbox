export const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear}/${date.getMonth() + 1}/${date.getDate() + 1}`;
}
export const getCurrentTime = () => {
    const date = new Date();
    return `${date.getHours()}時${date.getMinutes()}分`;
}

export const isDate = (date:Date) => {
    return !Number.isNaN(date.getTime());
}