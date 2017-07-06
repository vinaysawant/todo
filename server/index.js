const app = require('./app')

app.listen(7000, () => {
	console.log('Server is listening to port: ' + 7000 + ' ENVIRONMENT: ' + process.env.NODE_ENV)
});