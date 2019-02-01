// Origin: https://github.com/lodash/lodash/blob/master/chunk.js

const chunk = (array: any[], size: number): any => {
    size = Math.max(size, 0);
    const length = array == null ? 0 : array.length;

    if (!length || size < 1) {
        return [];
    }

    let index = 0;
    let resIndex = 0;

    const result = new Array(Math.ceil(length / size));

    for (index; index < length; index += size) {
        result[resIndex++] = array.slice(index, index + size);
    }

    return result;
}

export default chunk;
