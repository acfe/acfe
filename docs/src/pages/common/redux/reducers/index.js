const initState = {
    eventFunctions: {}
};

const pageData = (state = initState, action) => {
    switch (action.type) {
        case 'set':
            state[action.key] = action.data;
            return Object.assign({}, state);
        case 'setStatic':
            state[action.key] = action.data;
            return state;
        case 'refresh':
            return Object.assign({}, state);
        default:
            return state;
    }
};

export default pageData;
