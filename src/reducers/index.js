import {combineReducers} from "redux"
import todoLists from "../reducers/todo";

const rootReducer = combineReducers({
	todoLists,
})

export default rootReducer