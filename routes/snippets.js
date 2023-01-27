import express from "express";

import createError from "http-errors";

import { PrismaClient } from "@prisma/client";

import SnippetsValidator from "../validator/SnippetsValidator.js";

import SnippetsUpdateValidator from "../validator/SnippetsUpdateValidator.js";

import { expressjwt } from "express-jwt";

const prisma = new PrismaClient();

// j'initialise un routeur
const router = express.Router();

const auth = expressjwt({
	secret: process.env["JWT_KEY"],
	algorithms: ["HS256"],
});

//create snippets with prisma

router.post("/", auth, async (req, res, next) => {
	let snippetData;
	try {
		snippetData = SnippetsValidator.parse(req.body);
	} catch (error) {
		return res.status(400).json({ errors: error.issues });
	}

	const snippet = await prisma.snippets.create({
		data: {
			title: snippetData.title,
			content: snippetData.content,
			category: {
				connect: {
					id: snippetData.category_id,
				},
			},
			user: {
				connect: {
					id: req.auth.id,
				},
			},
		},
	});

	res.json({ msg: "Snippet created", snippet });
});

//get all snippets with prisma

router.get("/", auth, async (req, res, next) => {
	const snippets = await prisma.snippets.findMany({
		where: {
			user: {
				id: req.auth.id,
			},
		},
	});

	res.json({ msg: "Snippets get", snippets });
});

//get one snippets with prisma

router.get("/:id", auth, async (req, res, next) => {
	const snippet_id = parseInt(req.params.id);

	let snippet = await prisma.snippets.findFirst({
		where: {
			id: snippet_id,
		},
	});

	if (snippet.user_id !== req.auth.id) {
		return next(createError(400, "Ce snippet n'existe pas !"));
	}

	snippet = await prisma.snippets.delete({
		where: {
			id: snippet_id,
		},
	});

	res.json({ msg: "Snippet get", snippet });
});

//update snippets with prisma

router.patch("/:id", auth, async (req, res, next) => {
	const snippet_id = parseInt(req.params.id);

	let snippetData;
	try {
		snippetData = SnippetsUpdateValidator.parse(req.body);
	} catch (error) {
		return res.status(400).json({ errors: error.issues });
	}

	const snippet = await prisma.snippets.update({
		where: {
			id: snippet_id,
		},
		data: {
			...snippetData,
		},
	});

	res.json({ msg: "Snippet updated", snippet });
});

//delete snippets with prisma

router.delete("/:id", auth, async (req, res, next) => {
	const snippet_id = parseInt(req.params.id);

	let snippet = await prisma.snippets.findFirst({
		where: {
			id: snippet_id,
		},
	});

	if (snippet === null) {
		return next(createError(400, "Ce snippet n'existe pas !"));
	}

	if (snippet.user_id !== req.auth.id) {
		return next(createError(400, "Ce snippet n'existe pas !"));
	}

	snippet = await prisma.snippets.delete({
		where: {
			id: snippet_id,
		},
	});

	res.json({ msg: "Snippet deleted", snippet });
});

export default router;
