import Phaser from "phaser";

const config = {
  type: Phaser.AUTO, // Usa WebGL si está disponible, si no Canvas
  width: 800,
  height: 600,
  backgroundColor: "#87CEEB", // Cielo azul de fondo
  parent: "game", // Se monta en el div#game
  scene: {
    preload,
    create,
    update
  }
};

function preload() {
  // Acá se cargan assets (sprites, imágenes, sonidos)
}

function create() {
  // Acá se inicializan los objetos (agua, bote, jugador)
}

function update() {
  // Acá va la lógica que se ejecuta frame a frame (mover peces, caña, etc.)
}

new Phaser.Game(config);