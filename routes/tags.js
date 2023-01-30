import { expressjwt } from "express-jwt";
import express from "express";
import { PrismaClient } from "@prisma/client";
import TagsValidator from "../validator/TagsValidator.js";
import createError from "http-errors";

const router = express.Router();
const prisma = new PrismaClient();

const auth = expressjwt({
	secret: process.env["JWT_KEY"],
	algorithms: ["HS256"],
});

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

	res.json({ msg: "Tag created", tag });
});

//get all tags with prisma

router.get("/", auth, async (req, res, next) => {
	const tags = await prisma.tags.findMany({
		where: {
			user: {
				id: req.auth.id,
			},
		},
	});

	if (tags.length > 0) {
		res.json({ msg: "Tags get", tags });
	} else {
		return next(createError(400, "Vous n'avez pas de tags !"));
	}
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
		},
	});

	if (!tag) {
		return next(createError(400, "Ce tag n'existe pas !"));
	}

	if (tag.user_id !== req.auth.id) {
		return next(createError(400, "Ce tag n'existe pas !"));
	}

	tag = await prisma.tags.update({
		where: {
			id: tag_id,
		},
		data: {
			name: tagData.name,
		},
	});

	res.json({ msg: "Tag updated", tag });
});

//delete tag with prisma

router.delete("/:id", auth, async (req, res, next) => {
	const tag_id = parseInt(req.params.id);

	let tag = await prisma.tags.findFirst({
		where: {
			id: tag_id,
		},
	});

	if (!tag) {
		return next(createError(400, "Ce tag n'existe pas !"));
	}

	if (tag.user_id !== req.auth.id) {
		return next(createError(400, "Ce tag n'existe pas !"));
	}

	tag = await prisma.tags.delete({
		where: {
			id: tag_id,
		},
	});

	res.json({ msg: "Tag deleted", tag });
});

export default router;
