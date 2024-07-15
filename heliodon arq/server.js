const express =  require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const { Board, Relay } = require("johnny-five");
const board = new Board();

let reles = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



app.get('/blink/:numeroArco/:numeroLed', (req, res) => {
    const numeroArco = parseInt(req.params.numeroArco);
    const numeroLed = parseInt(req.params.numeroLed);

    let ledIndex;

    if (numeroArco == 1 && numeroLed >= 1 && numeroLed <= 17) {
        ledIndex = numeroLed - 1;
    } else if (numeroArco == 2 && numeroLed >= 1 && numeroLed <= 13) {
        ledIndex = numeroLed - 1;
    } else if (numeroArco == 3 && numeroLed >= 1 && numeroLed <= 17) {
        ledIndex = numeroLed - 1;
    } else {
        return res.status(404).send(`LED ${numeroLed} do Arco ${numeroArco} não encontrado`);
    }

    if (reles[numeroArco] && reles[numeroArco][ledIndex]) {
        reles[numeroArco][ledIndex].open();
        res.send(`Blinking LED ${numeroLed} do Arco ${numeroArco}`);
    } else {
        res.status(404).send(`LED ${numeroLed} do Arco ${numeroArco} não encontrado`);
    }
});

app.get('/stopblink/:numeroArco/:numeroLed', (req, res) => {
    const numeroArco = parseInt(req.params.numeroArco);
    const numeroLed = parseInt(req.params.numeroLed);
    let ledIndex;


    if (numeroArco == 1 && numeroLed >= 1 && numeroLed <= 17) {
        ledIndex = numeroLed - 1;
    } else if (numeroArco == 2 && numeroLed >= 1 && numeroLed <= 13) {
        ledIndex = numeroLed - 1;
    } else if (numeroArco == 3 && numeroLed >= 1 && numeroLed <= 17) {
        ledIndex = numeroLed - 1;
    } else {
        return res.status(404).send(`LED ${numeroLed} do Arco ${numeroArco} não encontrado`);
    }

    if (reles[numeroArco] && reles[numeroArco][ledIndex]) {
        reles[numeroArco][ledIndex].close();
        res.send(`Desligou lâmpada ${numeroLed} do Arco ${numeroArco}`);
    } else {
        res.status(404).send(`LED ${numeroLed} do Arco ${numeroArco} não encontrado`);
    }
});



app.listen(3000, () => {
    console.log("Server has started and is listening on port 3000");
});

board.on("ready", () => {
 
    const arcos = [
        { inicio: 31, fim: 48 }, // Arco 1: LEDs de 3 a 13
        { inicio: 18, fim: 31 }, // Arco 2: LEDs de 14 a 24
        { inicio: 3, fim: 17 } // Arco 3: LEDs de 25 a 35
    ];
    
    arcos.forEach((arco, indice) => {
        reles[indice + 1] = []; // Associando cada arco a um número de relé
    
        for (let i = arco.inicio; i <= arco.fim; i++) {
            // if (i == 13 && arco.inicio == 3){
        //     reles[indice + 1].push(new Relay(2));
        // }
        // else{
        //     reles[indice + 1].push(new Relay(i));
        // }
        // }
    
        let relay;
    
        if (i === 13 && arco.inicio === 3) {
          relay = new Relay(2);
        } else {
          relay = new Relay(i);
        }
    
        relay.close(); // Certifica-se de que o relé está inicialmente fechado
        reles[indice + 1].push(relay);
      }
    });
        console.log(reles)
    });