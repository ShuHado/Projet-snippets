import { z } from "zod";

const CategoriesValidator = z.object({
	name: z.string().min(1).max(255),
});

export default CategoriesValidator;
