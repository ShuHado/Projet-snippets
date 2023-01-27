// a utiliser si prisma n'est pas utilisé
// import * as dotenv from "dotenv";
// dotenv.config();
import express from "express";
import cors from "cors";

import v1 from "./version/v1.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/v1", v1);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
