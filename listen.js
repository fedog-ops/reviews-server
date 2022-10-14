const app = require('./app');

app.listen(process.env || 9090, () => {
    console.log('app listening');
})