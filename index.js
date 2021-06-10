const server = require('./websocket/server')
const client = require('./whatsapp/client')

server.on('connection', (socket) => client(socket, 'vitao-boiola'))

console.log("Aguardando conexão de navegador!")