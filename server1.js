const http = require('http');
const debug = require("debug")("node-angular");
const { app, user } = require('./backend/app'); // Importar app y user desde el archivo de la aplicación
//const user = require('./backend/app')


const normalizePort = val => {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port == "string" ? "pipe" + port : "port" + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = () => {
    const addr = server1.address();
    const bind = typeof port == "string" ? "pipe" + port : "port" + port;
    debug("Listening on" + bind);
};

const port = normalizePort(process.env.PORT || "5000");
user.set('port', port);


//const server = http.createServer(app); // Utiliza app como servidor
const server1 = http.createServer(user);


server1.on("error", onError);
server1.on("listening", onListening);
server1.listen(port);

