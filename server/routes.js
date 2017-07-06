const has = require('lodash/has')
const express = require('express')
const router = express.Router()

router.get('/v1.0.0/list/', (req, res) => {
	if (!has(req, 'session.todo_lists')) {
		req.session.todo_lists = []
	}

	res.json(req.session.todo_lists)
})

router.post('/v1.0.0/list/', (req, res) => {
	if (has(req, 'session.todo_lists')) {
		const listObj = {
			name: req.body['name'],
			todos: []
		}
		req.session.todo_lists.push(listObj)
		res.json(req.session.todo_lists)
	} else {
		res.json({error: true})
	}
})

router.post('/v1.0.0/list/:id/todo/:todo_id/', (req, res) => {
	if (has(req, 'session.todo_lists')) {
		const listId = req.params.id
		const todoId = req.params.todo_id
		const todoStatus = req.session.todo_lists[listId]['todos'][todoId]['status']
		console.log(todoStatus)
		req.session.todo_lists[listId]['todos'][todoId]['status'] = !todoStatus
		res.json(req.session.todo_lists)
	} else {
		res.json({error: true})
	}
})

router.post('/v1.0.0/list/:id/todo/', (req, res) => {
	if (has(req, 'session.todo_lists')) {

		const listId = req.params.id
		const name = req.body['name']
		req.session.todo_lists[listId]['todos'].push({status: false, name: name})

		res.json(req.session.todo_lists)
	} else {
		res.json({error: true})
	}
})

module.exports = router
