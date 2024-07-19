/*
 * Utility function to group an array elements by a key function.
 * Example: groupBy([1, 2, 3, 4, 5], (item) => String(item % 2)) => { 0: [2, 4], 1: [1, 3, 5] }
 */
export const groupBy = <T>(
    arr: Array<T>,
    keyFn: (item: T, index: number) => string,
): Record<string, T[]> => {
    return arr.reduce((acc: Record<string, T[]>, item: T, index) => {
        const key = keyFn(item, index);

        if (!acc?.[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
};
