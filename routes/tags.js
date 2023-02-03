import express from "express";
import { PrismaClient } from "@prisma/client";
import TagsValidator from "../validator/TagsValidator.js";
import createError from "http-errors";
import auth from "../middleware/authentification.js";

const router = express.Router();
const prisma = new PrismaClient();

//create tags with prisma

router.post("/", auth, async (req, res, next) => {
	let tagsData;
	try {
		tagsData = TagsValidator.parse(req.body);
	} catch (error) {
		return res.status(400).json({ errors: error.issues });
	}

	const tag = await prisma.tags.create({
		data: {
			...tagsData,
			user: {
				connect: {
					id: req.auth.id,
				},
			},
		},
	});

	res.status(201).json(tag);
});

//get all tags with prisma

router.get("/", auth, async (req, res, next) => {
	const tags = await prisma.tags.findMany({
		where: {
			user_id: req.auth.id,
		},
	});

	res.json(tags);
});

//update tag with prisma

router.patch("/:id", auth, async (req, res, next) => {
	const tag_id = parseInt(req.params.id);
	let tagData;
	try {
		tagData = TagsValidator.parse(req.body);
	} catch (error) {
		return res.status(400).json({ errors: error.issues });
	}

	let tag = await prisma.tags.findFirst({
		where: {
			id: tag_id,
			user_id: req.auth.id,
		},
	});

	if (!tag) {
		return next(createError(404, "Ce tag n'existe pas !"));
	}

	tag = await prisma.tags.update({
		where: {
			id: tag_id,
		},
		data: {
			name: tagData.name,
		},
	});

	res.json(tag);
});

//delete tag with prisma

router.delete("/:id", auth, async (req, res, next) => {
	const tag_id = parseInt(req.params.id);

	let tag = await prisma.tags.findFirst({
		where: {
			id: tag_id,
			user_id: req.auth.id,
		},
	});

	if (!tag) {
		return next(createError(404, "Ce tag n'existe pas !"));
	}

	await prisma.tags.delete({
		where: {
			id: tag_id,
		},
	});

	res.json({ msg: "Tag deleted" });
});

export default router;
