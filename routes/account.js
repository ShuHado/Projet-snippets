// import * as dotenv from "dotenv";
// dotenv.config();
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import express from "express";
import { PrismaClient } from "@prisma/client";
import UserValidator from "../validator/UserValidator.js";
import RegisterValidator from "../validator/RegisterValidator.js";
import UpdateValidator from "../validator/UpdateValidator.js";
import createError from "http-errors";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();

const auth = expressjwt({
	secret: process.env["JWT_KEY"],
	algorithms: ["HS256"],
});

router.post("/register", async (req, res, next) => {
	let registerData;
	try {
		registerData = RegisterValidator.parse(req.body);
	} catch (error) {
		return res.status(400).json({ errors: error.issues });
	}

	const user = await prisma.users.findFirst({
		where: {
			email: registerData.email,
		},
	});

	if (user)
		return next(createError(400, "Un compte existe déjà avec cet email."));

	const hashedPassword = await bcrypt.hash(registerData.password, 10);

	await prisma.users.create({
		data: {
			email: registerData.email,
			password: hashedPassword,
			profile_image: registerData.profile_image,
		},
	});

	res.json({ msg: "User created" });
});

router.post("/login", async (req, res, next) => {
	let loginData;
	try {
		loginData = UserValidator.parse(req.body);
	} catch (error) {
		return res.status(400).json({ errors: error.issues });
	}

	const user = await prisma.users.findFirst({
		where: {
			email: loginData.email,
		},
	});

	if (!user) return next(createError(403, "Mauvais email / mot de passe"));

	const passwordIsGood = await bcrypt.compare(
		loginData.password,
		user.password
	);

	if (!passwordIsGood)
		return next(createError(403, "Mauvais email / mot de passe"));

	// puis on renvoie le token
	res.json({
		token: jwt.sign(
			// payload
			{
				id: user.id,
			},
			// clef pour signer le token
			process.env["JWT_KEY"],
			// durée du token
			{
				expiresIn: "30m",
			}
		),
	});
});

router.patch("/user", auth, async (req, res, next) => {
	let modifyDatas;
	try {
		modifyDatas = UpdateValidator.parse(req.body);
	} catch (error) {
		return res.status(400).json({ errors: error.issues });
	}

	if (modifyDatas.password) {
		modifyDatas.password = await bcrypt.hash(modifyDatas.password, 10);
	}

	const user = await prisma.users.findFirst({
		where: {
			id: req.auth.id,
		},
	});

	if (!user) return next(createError(403, "Mauvais email / mot de passe"));

	const userUpdated = await prisma.users.update({
		where: {
			id: req.auth.id,
		},
		data: {
			...modifyDatas,
			updatedAt: new Date(),
		},
	});

	res.json({
		msg: "User modified",
		newInformations: userUpdated,
	});
});

export default router;
