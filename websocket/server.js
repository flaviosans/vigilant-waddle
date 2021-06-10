const ws = require('ws')

const server = new ws.Server({
    port: 8080
})

server.on('connection', (socket) => {
    onConnection(socket)
})

const onConnection = (socket) => {
    socket.on('message', (message) => {
        // Lógica de quando o cliente envia mensagem
    })

    socket.on('close', () => {
        // Lógica de quando a conexão se fecha
    })
    let res = {
        type: "info",
        data: "Conexão efetuada com sucesso!"
    }
    socket.send(JSON.stringify(res))
    console.log("conectado ao cliente")
}

module.exports = server