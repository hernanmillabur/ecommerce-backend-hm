const express = require("express");

const app = express();

/**
 * Middleware
 */

// Permite recibir JSON en las peticiones
app.use(express.json());

// Permite recibir datos de formularios
app.use(express.urlencoded({ extended: true }));

/**
 * Ruta temporal
 */

app.get("/", (req, res) => {
  res.send("API Ecommerce funcionando correctamente");
});

module.exports = app;
