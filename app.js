// a utiliser si prisma n'est pas utilisé
// import * as dotenv from "dotenv";
// dotenv.config();
import express from "express";
import cors from "cors";

import v1 from "./version/v1.js";
import docs from "./routes/docs.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/docs", docs);
app.use("/v1", v1);

app.use("/", (req, res) =>
	res.json({
		version: "1.0.0",
		message: "Documentation is available at /docs",
	})
);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
