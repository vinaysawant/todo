import { CALL_API } from "redux-api-middleware";

/**
 * HTTP Methods
 */
export const POST = 'POST'
export const PATCH = 'PATCH'
export const GET = 'GET'

export const REQUEST_GET_TODO_LIST = 'REQUEST_GET_TODO_LIST'
export const SUCCESS_GET_TODO_LIST = 'SUCCESS_GET_TODO_LIST'
export const FAILED_GET_TODO_LIST = 'FAILED_GET_TODO_LIST'

export const REQUEST_UPDATE_TODO_LIST = 'REQUEST_UPDATE_TODO_LIST'
export const SUCCESS_UPDATE_TODO_LIST = 'SUCCESS_UPDATE_TODO_LIST'
export const FAILED_UPDATE_TODO_LIST = 'FAILED_UPDATE_TODO_LIST'

export const REQUEST_UPDATE_STATUS_TODO_LIST = 'REQUEST_UPDATE_STATUS_TODO_LIST'
export const SUCCESS_UPDATE_STATUS_TODO_LIST = 'SUCCESS_UPDATE_STATUS_TODO_LIST'
export const FAILED_UPDATE_STATUS_TODO_LIST = 'FAILED_UPDATE_STATUS_TODO_LIST'

/**
 * Generic API redux middleware method
 * @param method
 * @param endpoint
 * @param request
 * @param success
 * @param failure
 * @param body
 * @param queryParams
 * @param credentials
 * @returns {{}}
 */
export const getApiMiddlewareJson = (endpoint, method, request, success, failure, body, queryParams, credentials = true) => {
	const jsonObject = {
		method: method,
		endpoint: endpoint,
		types: [request, success, failure],
		headers: {'Content-Type': 'application/json'},
	}

	if (method === 'POST' || method === 'PATCH')
		jsonObject['body'] = JSON.stringify(body)

	if (queryParams)
		jsonObject['endpoint'] = `${endpoint}?q=${queryParams}`

	if (credentials)
		jsonObject['credentials'] = 'include'
	return {
		[CALL_API]: jsonObject
	}
}

export const getTodoLists = () => {
	const endPoint = '/v1.0.0/list/'
	return getApiMiddlewareJson(
		endPoint,
		GET,
		REQUEST_GET_TODO_LIST,
		SUCCESS_GET_TODO_LIST,
		FAILED_GET_TODO_LIST
	)
}


export const createTodoList = (name) => {
	const endPoint = '/v1.0.0/list/'
	const body = {name: name}
	return getApiMiddlewareJson(
		endPoint,
		POST,
		REQUEST_UPDATE_TODO_LIST,
		SUCCESS_UPDATE_TODO_LIST,
		FAILED_UPDATE_TODO_LIST,
		body
	)
}

export const addTodo = (listIndex, name) => {
	const endPoint = `/v1.0.0/list/${listIndex}/todo/`
	const body = {name: name}
	return getApiMiddlewareJson(
		endPoint,
		POST,
		REQUEST_UPDATE_TODO_LIST,
		SUCCESS_UPDATE_TODO_LIST,
		FAILED_UPDATE_TODO_LIST,
		body
	)
}

export const updateListTodo = (listIndex, todoIndex) => {
	const endPoint = `/v1.0.0/list/${listIndex}/todo/${todoIndex}`
	return getApiMiddlewareJson(
		endPoint,
		POST,
		REQUEST_UPDATE_TODO_LIST,
		SUCCESS_UPDATE_TODO_LIST,
		FAILED_UPDATE_TODO_LIST,
	)
}
