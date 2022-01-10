import express from "express";
import cors from "cors";
import routes from "./routes";
import "reflect-metadata";
import "./database";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => `server running on port ${port}`);

export default app;
