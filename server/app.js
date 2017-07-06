const express = require('express')
const routes = require('./routes')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const app = express()

app.use(express.static(path.resolve(__dirname, '../', 'build')))

app.use(cookieParser('z{-B";-SQUNF(f2*;e&32482'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
	store: new RedisStore({
		host: 'localhost',
		port: 6379,
		ttl: 900000,
		logErrors: true}),
	secret: 'z{-B";-SQUNF(f2*;e_v2zR4]vg-e:j.',
	cookie: {maxAge: 180 * 24 * 60 * 60 * 1000}
}));

app.use('/', routes)

app.use('*', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'))
})

app.use((err, req, res, next) => {
	if (err) {
		res.status(400).json(err)
	} else {
		next()
	}
})

module.exports = app