const venom = require('venom-bot')

const client = (socket, session = 'default') => {
    const that = this
    venom.create(session, (base64Qr, asciiQR, attempts, urlCode) => {
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {}

        if (matches.length !== 3) {
            return new Error('Qual é, irmão? E o QR?')
        }

        response.type = matches[1]
        let res = {
            type: "qrcode",
            data: `<img src="${base64Qr}"></img>`
        }
        socket.send(JSON.stringify(res))
        response.data = new Buffer.from(matches[2], 'base64')
    }, handleStatusSession, handleQRCodeOptions)
        .then((client) => {
            client.onMessage(c => {
                handleOnMessage(c, socket)
            })
            client.getAllChatsWithMessages()
                .then(c => {
                    var response = {
                        type: "chatlist",
                        data: c
                    }
                    socket.send(JSON.stringify(response))
                })
                .catch(e => {
                    console.log(e)
                    console.log("caiu no catch")
                })
            socket.send(JSON.stringify(res))
            //socket.send("Já iniciou a sessão, recuperar as mensagens")
        })
}

const handleOnMessage = (message, socket) => {
    let response = {
        "type": "chat",
        "data": message
    }
    socket.send(JSON.stringify(response))
}

const handleQRCode = (base64Qr, asciiQR, attempts, urlCode) => {
    var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {}

    if (matches.length !== 3) {
        return new Error('Qual é, irmão? E o QR?')
    }

    response.type = matches[1]
    that.socket.send(`<img src="${base64Qr}"></img>`)
    response.data = new Buffer.from(matches[2], 'base64')
}

const handleStatusSession = (status, session) => {
    console.log(`Status: ${status}`)
    console.log(`Sessão: ${session}`)
}

const handleQRCodeOptions = {
    logQR: false
}

module.exports = client