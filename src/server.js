const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

// Fuerza DNS públicos para resolver mongodb+srv
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = require("./app");

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    console.log("Conectando a MongoDB Atlas...");

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ecommerce",
    });

    console.log("✅ Conectado a MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor");
    console.error(error);
    process.exit(1);
  }
}

startServer();
