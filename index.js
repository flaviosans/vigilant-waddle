const server = require('./websocket/server')
const client = require('./whatsapp/client')

server.on('connection', (socket) => client(socket, 'minha-conexao'))

console.log("Aguardando conexão de navegador!")