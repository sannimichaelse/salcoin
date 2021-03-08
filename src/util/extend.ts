const _extend = (origin: any, add: any): any => {
    // Don't do anything if add isn't an object
    if (!add || typeof add !== 'object') return origin;

    const keys = Object.keys(add);
    let i = keys.length;
    while (i--) {
        origin[keys[i]] = add[keys[i]];
    }
    return origin;
};

export default _extend;