import { z } from "zod";

const SnippetsUpdateValidator = z.object({
	title: z.string().min(2).max(255).optional(),
	content: z.string().min(4).max(255).optional(),
	category_id: z.number().min(1).optional(),
	tags: z.array(z.number().min(1)).optional(),
});

export default SnippetsUpdateValidator;
