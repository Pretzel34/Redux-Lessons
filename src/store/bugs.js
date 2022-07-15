
//Action Types
 const BUG_REMOVED = "bugRemoved";
 const BUG_ADDED = 'bugAdded';
 const BUG_RESOLVED = 'bugResolved';

//Action Creators
export const bugAdded = description => ({
        type: BUG_ADDED,
        payload: {
            description
        }
})

export const bugResolved = id => ({
        type: BUG_RESOLVED,
        payload: {
            id: 1
        }
})

//Reducer
let lastId = 0;

export default function reducer(state = [], action) {
    if (action.type === BUG_ADDED)
      return [
          ...state,
          {
              id: ++lastId,
              description: action.payload.description,
              resolved: false
          }
      ];
      else if (action.type === BUG_REMOVED)
        return state.filter(bug => bug.id !== action.payload.id)

    return state;
}
