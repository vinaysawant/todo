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
		url: 'redis://h:pa49a449f37498f06a82e6458d792694e6768ada5bb1122f83842d13334d7462c@ec2-34-226-55-20.compute-1.amazonaws.com:7529',
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