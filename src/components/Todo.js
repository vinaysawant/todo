import React from "react";
import Toggle from 'material-ui/Toggle';

const Todo = ({todo, listIndex, todoIndex, update}) => (
	<Toggle
		toggled={todo.status}
		onToggle={() => {
			update(listIndex, todoIndex)
		}}
		labelPosition="right"
		label={todo.name}
	/>
)

export default Todo