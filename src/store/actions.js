import * as actions from './actionTypes';

export function bugAdded(description) {
    return {
        type: actions.BUG_ADDED,
        payload: {
            description: "Bug1"
        }
    };
}

export function bugRemoved(description) {
    return {
        type: actions.BUG_REMOVED,
        payload: {
            id: 1
        }
    }
}