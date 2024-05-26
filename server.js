import express from "express";
import dotenv from "dotenv"
import repertorioRouter from "./src/routes/repertorioRoutes.js";

dotenv.config()
const app = express();

app.use(express.json());
const PORT = process.env.PORT ?? 3000;

app.use("/", repertorioRouter);


app.listen(PORT, () => { console.log("¡Servidor encendido!");});

export default app;
