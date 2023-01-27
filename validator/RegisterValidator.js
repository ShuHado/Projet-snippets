import { z } from "zod";

const UserValidator = z.object({
	email: z.string().email(),
	password: z.string().min(1).max(20),
	profile_image: z.string().optional(),
});

export default UserValidator;
