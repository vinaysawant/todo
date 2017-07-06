import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./components/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
const injectTapEventPlugin = require("react-tap-event-plugin")
injectTapEventPlugin()

const store = configureStore()

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root'));
registerServiceWorker();
