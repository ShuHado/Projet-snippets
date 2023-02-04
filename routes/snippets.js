import express from "express";
import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import SnippetsValidator from "../validator/SnippetsValidator.js";
import SnippetsUpdateValidator from "../validator/SnippetsUpdateValidator.js";
import auth from "../middleware/authentification.js";

const prisma = new PrismaClient();

// j'initialise un routeur
const router = express.Router();

const SORTORDER = "asc";
const SKIP = 0;
const TAKE = 5;

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
			tags: {
				connect: snippetData.tags.map((id) => {
					return { id };
				}),
			},
			user: {
				connect: {
					id: req.auth.id,
				},
			},
		},
	});

	res.status(201).json(snippet);
});

router.get("/", auth, async (req, res, next) => {
	const category_id = parseInt(req.query.category);

	// field to sort
	const sortBy = req.query.sortBy;
	// sorting order: asc or desc
	const sortOrder = req.query.sortOrder || SORTORDER;

	const skip = parseInt(req.query.skip) || SKIP;
	const take = parseInt(req.query.take) || TAKE;

	const where = {
		user_id: req.auth.id,
	};

	const select = {
		id: true,
		title: true,
		createdAt: true,
		updatedAt: true,
	};

	const orderBy = {};
	if (sortBy) {
		orderBy[sortBy] = sortOrder;
	}

	let category;

	if (category_id) {
		category = await prisma.categories.findFirst({
			where: {
				id: category_id,
				user_id: req.auth.id,
			},
		});
	}

	if (category_id && !category) {
		return next(createError(404, "Cette catégorie n'existe pas !"));
	}

	if (category_id) {
		where["category_id"] = category_id;
	}

	const totalSnippets = await prisma.snippets.count({
		where,
	});

	const snippets = await prisma.snippets.findMany({
		select,
		where,
		orderBy,
		skip,
		take,
	});

	const prevQuery = new URLSearchParams({
		skip: Math.max(skip - take, 0),
		take,
	});

	const nextQuery = new URLSearchParams({
		skip: skip + take,
		take,
	});

	res.json({
		pagination: {
			skip,
			take,
			category,
		},
		total: totalSnippets,
		snippets,
		links: {
			prev: `/v1/snippets?${prevQuery}`,
			next: `/v1/snippets?${nextQuery}`,
		},
	});
});

//get one snippets with prisma by id with error handling

router.get("/:id", auth, async (req, res, next) => {
	const snippet_id = parseInt(req.params.id);

	let snippet = await prisma.snippets.findFirst({
		where: {
			id: snippet_id,
			user_id: req.auth.id,
		},
		include: {
			category: true,
			tags: true,
		},
	});

	if (!snippet) {
		return next(createError(404, "Ce snippet n'existe pas !"));
	}

	res.json(snippet);
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

	let snippet = await prisma.snippets.findFirst({
		where: {
			id: snippet_id,
			user_id: req.auth.id,
		},
	});

	if (!snippet) {
		return next(createError(404, "Ce snippet n'existe pas !"));
	}

	snippet = await prisma.snippets.update({
		where: {
			id: snippet_id,
		},
		data: {
			...snippetData,
			updatedAt: new Date(),
		},
	});

	res.json(snippet);
});

//delete snippets with prisma

router.delete("/:id", auth, async (req, res, next) => {
	const snippet_id = parseInt(req.params.id);

	let snippet = await prisma.snippets.findFirst({
		where: {
			id: snippet_id,
			user_id: req.auth.id,
		},
	});

	if (!snippet) {
		return next(createError(404, "Ce snippet n'existe pas !"));
	}

	await prisma.snippets.delete({
		where: {
			id: snippet_id,
		},
	});

	res.json({ msg: "Snippet deleted" });
});

export default router;
