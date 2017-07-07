import React, { Component } from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import * as todoActions from "../actions/todo";

import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

class Container extends Component {

	state = {
		filter: ''
	}

	setAllFilter = () => {
		this.setState({
			filter: ''
		})
	}

	setActiveFilter = () => {
		this.setState({
			filter: false
		})
	}

	setCompletedFilter = () => {
		this.setState({
			filter: true
		})
	}

	addTodo = (listIndex) => {
		const newTodo = this.refs.newTodo.getValue()
		if (newTodo.trim() !== "") {
			this.props.addTodo(listIndex, newTodo)
			this.refs.newTodo.getInputNode().value = ""
		}
	}

	update = (listIndex, todoIndex) => {
		this.props.update(listIndex, todoIndex)
		this.setActiveFilter()
	}

	render() {
		const currentThis = this
		return (
			<Card style={{margin: 10, maxWidth: '300px', float: 'left'}}>
				<CardTitle title={this.props.todoList.name}></CardTitle>
				<CardText>
					<TextField
						hintText="Add to do.."
						ref="newTodo"
					/>
					<RaisedButton label="ADD" style={{margin: 12}} onTouchTap={() => {
						this.addTodo(this.props.listIndex)
					}}/>
				</CardText>
				<CardText>
					{
						this.props.todoList.todos.map((todo, index) => {
							return (this.state.filter === '' || this.state.filter === todo.status) && <Todo key={index}
							                                                                                todo={todo}
							                                                                                listIndex={this.props.listIndex}
							                                                                                todoIndex={index}
							                                                                                update={currentThis.update}/>
						})
					}
				</CardText>
				<CardActions>
					<FlatButton label="All" onTouchTap={() => {
						this.setAllFilter()
					}}/>
					<FlatButton label="Completed" onTouchTap={() => {
						this.setCompletedFilter()
					}}/>
					<FlatButton label="Active" onTouchTap={() => {
						this.setActiveFilter()
					}}/>
				</CardActions>
			</Card>
		)

	}
}


const mapStateToProps = (state) => {
	return {
		todoLists: state.todoLists
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		update: (listIndex, todoIndex) => {
			dispatch(todoActions.updateListTodo(listIndex, todoIndex))
		},
		addTodo: (listIndex, name) => {
			dispatch(todoActions.addTodo(listIndex, name))
		}
	}
}

export { Container }
export default connect(mapStateToProps, mapDispatchToProps)(Container)
