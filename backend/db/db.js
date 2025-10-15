const mongoose = require("mongoose");

function connectionToDb() {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    })
    .then(() => console.log("✅ Connected to DB"))
    .catch((err) => console.error("❌ DB Connection Error:", err));
}

module.exports = connectionToDb;
