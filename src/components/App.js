import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import Container from "./Container";
import * as todoActions from "../actions/todo";

import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class App extends Component {

	createTodoList = () => {
		const name = this.refs.newList.getValue()
		this.props.createTodoList(name)
		this.refs.newList.value = ""
	}

	componentDidMount = () => {
		this.props.getTodoLists()
	}

	render() {
		return (
			<div>
				<AppBar
					title="Todos"
					showMenuIconButton={false}
					zDepth={2}
					style={{position: 'fixed', top: 0}}
					iconElementRight={
						<div>
							<TextField
								hintText="e.g Cricket on Sunday"
								ref="newList"
								floatingLabelText="Create new todo list"
							/>
							<RaisedButton label="CREATE LIST" style={{margin: 12}} onTouchTap={this.createTodoList}/>
						</div>
					}
				/>
				<div style={{marginTop: '100px'}}>
					{
						this.props.todoLists.map((list, index) => {
							return <Container todoList={list}
							                  key={index}
							                  listIndex={index}
							/>
						})
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		todoLists: state.todoLists
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getTodoLists: () => {
			dispatch(todoActions.getTodoLists())
		},
		createTodoList: (name) => {
			dispatch(todoActions.createTodoList(name))
		},
	}
}

export { App }
export default connect(mapStateToProps, mapDispatchToProps)(App)
