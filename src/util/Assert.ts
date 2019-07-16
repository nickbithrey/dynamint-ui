
const error = (message: string) => {
    return Error(message);
};

export const assertDefined = (val: any, message: string) => {
    if (val == null) { // not null and not undefined
        throw error(message);
    }
    return true;
}

export const assertHasLength = (val: Array<any>, message: string) => {
    assertDefined(val, message);
    if (val.length === 0) {
        throw error(message);
    }
    return true;
}