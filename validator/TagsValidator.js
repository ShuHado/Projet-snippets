import { z } from "zod";

const TagsValidator = z.object({
	name: z.string().min(1).max(255),
});

export default TagsValidator;
