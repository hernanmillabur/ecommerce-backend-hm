const express = require("express");

const productsRouter = require("./routes/products.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.send("🚀 API Ecommerce funcionando correctamente");
});

module.exports = app;
