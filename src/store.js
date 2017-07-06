import {applyMiddleware, compose, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import {apiMiddleware} from "redux-api-middleware"
import {createLogger} from "redux-logger"
import rootReducer from "./reducers/index"

const predicate = process.env.NODE_ENV === 'development'

const logger = createLogger({
	level: 'info',
	collapsed: false,
	logger: console,
	predicate: (getState, action) => predicate
})

export default function configureStore() {
	const w = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'

	const store = createStore(
		rootReducer,
		compose(
			applyMiddleware(
				thunkMiddleware,
				apiMiddleware,
				logger
			), w ? window.devToolsExtension() : f => f
		)
	)

	if (module.hot && predicate) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers/index', () => {
			const nextRootReducer = require('./reducers/index')
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}
