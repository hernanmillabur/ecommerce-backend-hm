require("dotenv").config();

const mongoose = require("mongoose");

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Conexión exitosa");

    process.exit(0);
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}

test();
