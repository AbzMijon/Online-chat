export const randomInteger = (min: number, max: number) => {
    let rand = min + Math.random() * (max - min + 1);
    return Math.round(rand);
}