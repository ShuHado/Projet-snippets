import { z } from "zod";

const UpdateValidator = z.object({
	email: z.string().email().optional(),
	password: z.string().min(1).max(20).optional(),
	profile_image: z.string().optional(),
});

export default UpdateValidator;
