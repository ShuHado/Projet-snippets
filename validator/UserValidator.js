import { z } from "zod";

const UserValidator = z.object({
	email: z.string().email(),
	password: z.string().min(1).max(20),
});

export default UserValidator;
