import express from "express";
import accountRouter from "../routes/account.js";
import categoriesRouter from "../routes/categories.js";
import snippetsRouter from "../routes/snippets.js";
import tagsRouter from "../routes/tags.js";

const router = express.Router();

router.use("/account", accountRouter);
router.use("/categories", categoriesRouter);
router.use("/snippets", snippetsRouter);
router.use("/tags", tagsRouter);

router.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		return res.status(401).json({ msg: "Ton JWT est invalide !" });
	}

	return res.status(err.status).json({ error: err.message });
});

export default router;
