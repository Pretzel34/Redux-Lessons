import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import  reducer  from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toasts";
import api from "./middleware/api";


export default function() {
    return configureStore({ 
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            logger({ destination: "console" }),
            api
        ]
    });
}