export default (state = {}, action) => {
    switch (action.type) {
    case 'LOGIN':
        return {
            uid: action.uid
        };
    case 'REGISTER':
        return {
            uid: action.uid
        };
    case 'LOGOUT': 
        return {};
    case 'ERROR': 
        return {
            error: action.error
        };
    default:
        return state;
    }
};