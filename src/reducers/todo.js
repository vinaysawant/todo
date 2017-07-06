import * as ActionType from "../actions/todo";
import get from "lodash/get";

function todoLists(state = [], action) {
	switch (action.type) {
		case ActionType.SUCCESS_GET_TODO_LIST:
		case ActionType.SUCCESS_UPDATE_TODO_LIST:
		case ActionType.REQUEST_UPDATE_STATUS_TODO_LIST:
			return get(action, 'payload', '')
		default:
			return state
	}
}

export default todoLists