const fs = require('fs');
const venom = require('venom-bot');
const express = require('express')

const app = express();

function start(client) {
    client.onMessage((message) => {
        if (message.body.search("Esse item ainda está") === -1) {
            client.sendText(message.from, 'Oi, tudo bem? Ainda está disponível sim')
                .then((result) => {
                    console.log(`Agora sim foi`)
                })
        }

    })
}

venom
    .create(
        'sessionName',
        (base64Qr, asciiQR, attempts, urlCode) => {

            console.log(asciiQR); // Optional to log the QR in the terminal
            var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer.from(matches[2], 'base64');

            var imageBuffer = response;
            require('fs').writeFile(
                'out.png',
                imageBuffer['data'],
                'binary',
                function(err) {
                    if (err != null) {
                        console.log(err);
                    }
                }
            );


            app.get('/', (req, res) => {
                res.send(`<img src="${base64Qr}"></img>`)
            })

            app.listen(3000, () => {
                console.log(`Run, baby :-)`)
            })
        },
        undefined, { logQR: false }
    )
    .then((client) => {
        start(client);
    })
    .catch((erro) => {
        console.log(erro);
    });