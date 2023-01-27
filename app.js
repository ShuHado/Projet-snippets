// a utiliser si prisma n'est pas utilisé
// import * as dotenv from "dotenv";
// dotenv.config();
import { expressjwt } from "express-jwt";
import express from "express";
import cors from "cors";

import accountRouter from "./routes/account.js";

const app = express();
const port = 3000;

const auth = expressjwt({
	secret: process.env["JWT_KEY"],
	algorithms: ["HS256"],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/account", accountRouter);

app.get("/secret", auth, (req, res) => {
	res.json({ msg: "bravo, tu as accès à cette route" });
});

app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		return res.status(401).json({ msg: "Ton JWT est invalide !" });
	}

	return res.status(err.status).json({ error: err.message });
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
