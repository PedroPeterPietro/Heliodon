// const { Board, Led } = require('johnny-five');
// const board = new Board();

// board.on("ready", () => {
//   // Defina os pinos para ENA, DIR e PUL
//   const enaPin = 52; // Pino ENA
//   const dirPin = 51; // Pino DIR
//   const pulPin = 50; // Pino PUL
  
//   // Configure os pinos como saídas
//   const enable = new Led(enaPin);
//   const direction = new Led(dirPin);
//   const pulse = new Led(pulPin);

//   // Habilitar o motor
//   enable.off();
//   pulse.on();
//   // Definir a direção do motor (HIGH para um sentido, LOW para o outro)
//   direction.on(); // Defina a direção desejada

//   // Função para enviar pulsos e aguardar 10 segundos
//   const sendPulseAndWait = (i) => {
//     if (i < 200) {
//       pulse.on();
//       setTimeout(() => {
//         pulse.off();
//         setTimeout(() => {
//           // Ajuste o tempo conforme necessário para a velocidade desejada
//           sendPulseAndWait(i + 1); // Chama recursivamente para o próximo pulso
//         }, 1);
//       }, 1);
//     }
//   };



  
//   // Inicie o envio de pulsos
// moveMotor(pulse,direction, 10)
// // moveMotor(pulse,direction, -10)
// });

// async function moveMotor(pulse, direction, graus){
//   let microSteps = 800
//   if (graus > 0 ){
//     direction.on()
//   }
//   else{
//     direction.off()    
//   }  
//   const steps = Math.abs(graus) / (1.8 / microSteps);
//     let pulso = false;
//     const intervalo = 1000; // Adjust the interval as needed

//     // Simulate motor movement
//     for (let i = 0; i < steps; i++) {
//       pulso = !pulso;
//       if (i % 2 === 0) {
//           pulse.on()
//       } else {
//         pulse.off()
//       }      
//       // Simulate delay
//       await delayMicroseconds(intervalo);
//     }
//   console.log("Fez a funcao completa", graus)
// }

// function delayMicroseconds(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms / 1000));
// }

const { Board, Led } = require('johnny-five');
const board = new Board();

board.on('ready', () => {
  // Defina os pinos para ENA, DIR e PUL
  const enaPin = 52; // Pino ENA
  const dirPin = 51; // Pino DIR
  const pulPin = 50; // Pino PUL
  
  // Configure os pinos como saídas
  const enable = new Led(enaPin);
  const direction = new Led(dirPin);
  const pulse = new Led(pulPin);

  // Função para mover o motor para um ângulo específico
  const moveMotorToAngle = async (graus) => {
    let microSteps = 800;
    if (graus >= 0) {
      console.log('Movendo no sentido horário');
      direction.on(); // Mover no sentido horário ou positivo
    } else {
      console.log('Movendo no sentido anti-horário');
      direction.off();    
    }
    
    const steps = Math.abs(graus) / (1.8 / microSteps);
    const intervalo = 50; // Intervalo de 1 segundo entre os pulsos

    // Simular o movimento do motor
    console.log(`Iniciando movimento para ${graus} graus...`);
    for (let i = 0; i < steps; i++) {
      pulse.on();
      await delayMicroseconds(intervalo / 2); // Manter o pulso ativo por metade do intervalo
      pulse.off();
      await delayMicroseconds(intervalo / 2); // Esperar a outra metade do intervalo
    }
    console.log("Movimento concluído para", graus, "graus");
    // pulse.off();
  };

  // Função para simular microssegundos de atraso
  function delayMicroseconds(ms) {
    return new Promise(resolve => setTimeout(resolve, ms / 1000));
  }

  // Exemplo: mover o motor para 10 graus
  moveMotorToAngle(200);

  moveMotorToAngle(-200);
});


