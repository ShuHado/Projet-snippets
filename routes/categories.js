import express from "express";
import { PrismaClient } from "@prisma/client";
import CategoriesValidator from "../validator/CategoriesValidator.js";
import createError from "http-errors";
import auth from "../middleware/authentification.js";

const router = express.Router();
const prisma = new PrismaClient();

const SORTORDER = "asc";
const SKIP = 0;
const TAKE = 5;

//create categories with prisma

router.post("/", auth, async (req, res, next) => {
	let categoryData;
	try {
		categoryData = CategoriesValidator.parse(req.body);
	} catch (error) {
		return res.status(400).json({ errors: error.issues });
	}

	const category = await prisma.categories.create({
		data: {
			...categoryData,
			user: {
				connect: {
					id: req.auth.id,
				},
			},
		},
	});

	res.status(201).json(category);
});

//get all categories with prisma

router.get("/", auth, async (req, res, next) => {
	// field to sort
	const sortBy = req.query.sortBy;
	// sorting order: asc or desc
	const sortOrder = req.query.sortOrder || SORTORDER;

	const skip = parseInt(req.query.skip) || SKIP;
	const take = parseInt(req.query.take) || TAKE;

	const where = {
		user_id: req.auth.id,
	};

	const orderBy = {};
	if (sortBy) {
		orderBy[sortBy] = sortOrder;
	}

	const totalCategories = await prisma.categories.count({
		where,
	});

	const categories = await prisma.categories.findMany({
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
		},
		total: totalCategories,
		categories,
		links: {
			prev: `/v1/categories?${prevQuery}`,
			next: `/v1/categories?${nextQuery}`,
		},
	});
});

//update categories with prisma

router.patch("/:id", auth, async (req, res, next) => {
	const category_id = parseInt(req.params.id);
	let categoryData;
	try {
		categoryData = CategoriesValidator.parse(req.body);
	} catch (error) {
		return res.status(400).json({ errors: error.issues });
	}

	let category = await prisma.categories.findFirst({
		where: {
			id: category_id,
			user_id: req.auth.id,
		},
	});

	if (!category) {
		return next(createError(404, "Cette catégorie n'existe pas !"));
	}

	category = await prisma.categories.update({
		where: {
			id: category_id,
		},
		data: {
			...categoryData,
		},
	});

	res.json(category);
});

//delete categories by his id and his user_id with prisma

router.delete("/:id", auth, async (req, res, next) => {
	const category_id = parseInt(req.params.id);

	let category = await prisma.categories.findFirst({
		where: {
			id: category_id,
			user_id: req.auth.id,
		},
	});

	if (!category) {
		return next(createError(404, "Cette catégorie n'existe pas !"));
	}

	await prisma.categories.delete({
		where: {
			id: category_id,
		},
	});

	res.json({ msg: "Category deleted" });
});

export default router;
