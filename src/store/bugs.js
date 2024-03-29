import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import { apiCallBegan } from "./api";
import moment from 'moment';
import { difference } from "lodash";


const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {

        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },

        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },
        //bugs/bugsRecieved
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },
        //actions => action handlers
        bugAssignedToUser: (bugs, action) => {
            const { id: bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        },
        //bugAdded
        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload);
        },
        //
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        }
    }
});

export const {
    bugAdded,
     bugResolved,
     bugAssignedToUser,
     bugsReceived,
     bugsRequested,
     bugsRequestFailed
    } = slice.actions;
export default slice.reducer;

//Action Creators
const url = "/bugs"

export const loadBugs = () => (dispatch, getState) => {
    const {lastFetch} = getState().entities.bugs;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

    if (diffInMinutes < 10) return;

    dispatch(apiCallBegan({
        url,
        onSuccess: bugsReceived.type,
        onStart: bugsRequested.type,
        onError: bugsRequestFailed.type
    }));
};

export const addBug = bug => apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type
})

export const resolveBug = id => apiCallBegan({
    url: url + '/' + id,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type
})

// export const loadBugs = () => 
// apiCallBegan({
//     url,
//     onSuccess: bugsReceived.type,
//     onStart: bugsRequested.type,
//     onError: bugsRequestFailed.type
// });
//Selector
// export const getUnresolvedBugs = state => 
//     state.entities.bugs.filter(bug => !bug.resolved);

    //Memoizatiuon
    //bugs => get unresolved bugs
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    bugs => bugs.filter(bug => !bug.resolved)
);


export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
);

export const assignBugToUser = (bugId, userId) => apiCallBegan({
    url: url + '/' + bugId,
    method: 'patch', 
    data: {userId},
    onSuccess: bugAssignedToUser.type
});

