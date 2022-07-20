import {createSlice} from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        //actions => action handlers
        userAdded: (users, action) => {
            users.push({
                id: ++lastId,
                name: action.payload.name,
            });
        },
        projectResolved: (project, action) => {
            const index = project.findIndex(project => project.id === action.payload.id);
            project[index].resolved = true;
        }
    }
});

export const {userAdded} = slice.actions;
export default slice.reducer;