import { expressjwt } from "express-jwt";
import express from "express";
import { PrismaClient } from "@prisma/client";
import CategoriesValidator from "../validator/CategoriesValidator.js";
import createError from "http-errors";

const router = express.Router();
const prisma = new PrismaClient();

const auth = expressjwt({
	secret: process.env["JWT_KEY"],
	algorithms: ["HS256"],
});

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

	res.json({ msg: "Category created", category });
});

//get all categories with prisma

router.get("/", auth, async (req, res, next) => {
	const categories = await prisma.categories.findMany({
		where: {
			user: {
				id: req.auth.id,
			},
		},
	});

	if (!categories) {
		res.json({ msg: "Categories get", categories });
	} else {
		return next(createError(400, "Vous n'avez pas de catégories !"));
	}
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
		},
	});

	if (category.user_id !== req.auth.id) {
		return next(createError(400, "Cette catégorie n'existe pas !"));
	}

	category = await prisma.categories.update({
		where: {
			id: category_id,
		},
		data: {
			name: categoryData.name,
		},
	});

	res.json({ msg: "Category updated", category });
});

//delete categories by his id and his user_id with prisma

router.delete("/:id", auth, async (req, res, next) => {
	const category_id = parseInt(req.params.id);

	let category = await prisma.categories.findFirst({
		where: {
			id: category_id,
		},
	});

	if (category.user_id !== req.auth.id) {
		return next(createError(400, "Cette catégorie n'existe pas !"));
	}

	category = await prisma.categories.delete({
		where: {
			id: category_id,
		},
	});

	res.json({ msg: "Category deleted", category });
});

export default router;
