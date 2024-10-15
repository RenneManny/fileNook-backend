require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute.js");
const connect = require("./db/db.js");
const PORT = process.env.PORT;

const app = express();

if (!PORT) {
  console.log(`${PORT} doesn't exist !!`);
  process.exit(1);
}
// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}!!`);
});
