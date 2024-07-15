const { Board, Led, Sensor } = require("johnny-five");
const board = new Board();

board.on("ready", async () => {
  // Defina os pinos para ENA, DIR e PUL
  const enaPin = 52; // Pino ENA
  const dirPin = "A0"; // Pino DIR
  const pulPin = 50; // Pino PUL

  // Configure os pinos como saídas
  const enable = new Led(enaPin);
  const direction = new Sensor (dirPin);
  const pulse = new Led (pulPin);

  // Habilitar o motor
  enable.off();

  // Inicie o envio de pulsos
  await sendPulseAndWait(pulse, direction);

  // Desabilitar o motor após o envio de pulsos
  enable.on();
});

async function moveMotor(pulse, direction, graus) {
  let microSteps = 800;

  direction.on(graus > 0 ? 255 : 0);

  const steps = Math.abs(graus) / (1.8 / microSteps);
  let pulso = false;
  const intervalo = 1000; // Adjust the interval as needed

  // Simulate motor movement
  for (let i = 0; i < steps; i++) {
    pulso = !pulso;
    if (i % 2 === 0) {
      pulse.on();
    } else {
      pulse.off();
    }
    // Simulate delay
    await delayMicroseconds(intervalo);
  }

  console.log("Função de movimento concluída", graus);
}

function delayMicroseconds(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms / 1000));
}

async function iniciarEnvioDePulsos(pulse, direction) {
  try {
    // Mova o motor para a frente (graus positivos)
    await moveMotor(pulse, direction, 5);

    // Mova o motor para trás (graus negativos)
    await moveMotor(pulse, direction, -5);
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function sendPulseAndWait(pulse, direction) {
  try {
    // Mova o motor para a frente (graus positivos)
    await moveMotor(pulse, direction, 5);

    // Mova o motor para trás (graus negativos)
    await moveMotor(pulse, direction, -5);
  } catch (error) {
    console.error("Erro:", error);
  }
}

