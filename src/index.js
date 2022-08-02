import configureStore from "./store/configureStore";
import * as actions from './store/api';
import { bugAdded, bugResolved, getUnresolvedBugs, bugAssignedToUser, getBugsByUser  } from "./store/bugs";
import {projectAdded} from "./store/projects";
import { userAdded } from "./store/users";
import reducer from "./store/reducer";
import { loadBugs, resolveBug, assignBugToUser } from "./store/bugs";
import { addBug } from "./store/bugs";

const store = configureStore();

// store.dispatch(
//     actions.apiCallBegan({
//         url: "/bugs",
//         onSuccess: "bugsRecieved",
//     })
// );

// UI Layer
store.dispatch(loadBugs());

setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);

// store.dispatch({
//     type: "apiCallBegan",
//     payload: {
//         url: "/bugs",
//         onSuccess: "bugs/bugsRecieved",
//         onError: "apiRequestFailed"
//     }

    //Call an API
    //When the promise is resolved => dispatch()
    // dispatch({ type: 'bugsRecieved', bugs: [1,2,3]})
    // console.log(getState());
    // If the promise is rejected => dispatch()
// });

// store.subscribe(() => {
//     console.log("Store changed!");
// });

// store.dispatch(userAdded({ name: "User 1"}))
// store.dispatch(projectAdded({name: "Project 1"}));
// store.dispatch(bugAdded({description: "Bug 1"}));
// store.dispatch(bugAdded({description: "Bug 2"}));
// store.dispatch(bugAdded({description: "Bug 3"}));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1}));
// store.dispatch(bugResolved({ id: 1 }));

// const bugs = getBugsByUser(1)(store.getState());

// const x = getUnresolvedBugs(store.getState());
// const y = getUnresolvedBugs(store.getState());


// console.log(bugs);
