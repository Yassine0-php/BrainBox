require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");

const app = express();

const PORT = 3000;
const cors = require('cors');

const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/database");

const connaissanceRoutes = require("./routes/connaissanceRoute.js");
const iaRoutes = require("./routes/assistantRoute.js");


connectDB();

app.use(cors({
    origin: "http://localhost:4200"
}));

app.use(express.json());



// app.use(
//     "/api/connaissances",
//     connaissanceRoutes
// );

app.use(
    "/api/connaissances",connaissanceRoutes
);



app.use("/api/assistant", iaRoutes);

app.get("/", (req, res) => {
  res.send("Backend BrainBox fonctionne !");
});



app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});