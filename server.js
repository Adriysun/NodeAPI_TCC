const http = require ('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);












/*
const app = require('../src/app');
const port = normalizaPort(process.env.PORT || '3000');
function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
if (port >= 0) {
        return port;
    }
return false;
}
app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})
*/