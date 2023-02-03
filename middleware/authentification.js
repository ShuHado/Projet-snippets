import { expressjwt } from "express-jwt";

const auth = expressjwt({
	secret: process.env["JWT_KEY"],
	algorithms: ["HS256"],
});

export default auth;
