export default {
	swagger: "2.0",
	info: {
		title: "Snippets Manager API",
		version: "1.0.0",
		description:
			"API for Snippets Manager app. Made with Node.js, Express, Prisma, MySQL and Swagger.",
	},
	basePath: "/v1",
	tags: [
		{
			name: "snippets",
			description: "Everything about snippets",
		},
		{
			name: "categories",
			description: "Everything about categories",
		},
		{
			name: "tags",
			description: "Everything about tags",
		},
		{
			name: "account",
			description: "Operations about account",
		},
	],
	paths: {
		"/account": {
			get: {
				summary: "Get account.",
				tags: ["account"],
				produces: ["application/json"],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
				},
			},
			patch: {
				summary: "Update tag.",
				tags: ["account"],
				produces: ["application/json"],
				parameters: [
					{
						in: "path",
						name: "id",
						description: "Tag ID",
						required: true,
						type: "integer",
						example: 42468,
					},
				],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
					400: {
						description: "Bad request",
					},
					404: {
						description: "Tag not found",
					},
				},
			},
		},
		"/account/register": {
			post: {
				summary: "Register account.",
				tags: ["account"],
				produces: ["application/json"],
				responses: {
					201: {
						description: "Account created",
						schema: {
							type: "array",
						},
					},
					400: {
						description: "Bad request",
					},
				},
			},
		},
		"/account/login": {
			post: {
				summary: "Login account.",
				tags: ["account"],
				produces: ["application/json"],
				responses: {
					201: {
						description: "Tag created",
						schema: {
							type: "array",
						},
					},
					403: {
						description: "Bad email or password",
					},
				},
			},
		},
		"/snippets": {
			get: {
				summary:
					"Get all snippets or snippets of a category with pagination.",
				tags: ["snippets"],
				produces: ["application/json"],
				parameters: [
					{
						in: "query",
						name: "category",
						description: "Category ID",
						type: "integer",
						example: 42468,
					},
				],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
				},
			},
			post: {
				summary: "Create snippet.",
				tags: ["snippets"],
				produces: ["application/json"],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					201: {
						description: "Category created",
						schema: {
							type: "array",
						},
					},
					400: {
						description: "Bad request",
					},
				},
			},
		},
		"/snippets/{id}": {
			get: {
				summary: "Get snippet by ID.",
				tags: ["snippets"],
				produces: ["application/json"],
				parameters: [
					{
						in: "path",
						name: "id",
						description: "Snippet ID",
						required: true,
						type: "integer",
						example: 42468,
					},
				],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
					404: {
						description: "Category not found",
					},
				},
			},
			patch: {
				summary: "Update snippet.",
				tags: ["snippets"],
				produces: ["application/json"],
				parameters: [
					{
						in: "path",
						name: "id",
						description: "Snippet ID",
						required: true,
						type: "integer",
						example: 42468,
					},
				],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
					400: {
						description: "Bad request",
					},
					404: {
						description: "Snippet not found",
					},
				},
			},
			delete: {
				summary: "Delete categorie.",
				tags: ["snippets"],
				produces: ["application/json"],
				parameters: [
					{
						in: "path",
						name: "id",
						description: "Snippet ID",
						required: true,
						type: "integer",
						example: 42468,
					},
				],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
					},
					404: {
						description: "Snippet not found",
					},
				},
			},
		},
		"/categories": {
			get: {
				summary: "Get all categories with pagination.",
				tags: ["categories"],
				produces: ["application/json"],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
				},
			},
			post: {
				summary: "Create categorie.",
				tags: ["categories"],
				produces: ["application/json"],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					201: {
						description: "Category created",
						schema: {
							type: "array",
						},
					},
					400: {
						description: "Bad request",
					},
				},
			},
		},
		"/categories/{id}": {
			patch: {
				summary: "Update categorie.",
				tags: ["categories"],
				produces: ["application/json"],
				parameters: [
					{
						in: "path",
						name: "id",
						description: "Category ID",
						required: true,
						type: "integer",
						example: 42468,
					},
				],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
					400: {
						description: "Bad request",
					},
					404: {
						description: "Tag not found",
					},
				},
			},
			delete: {
				summary: "Delete categorie.",
				tags: ["categories"],
				produces: ["application/json"],
				parameters: [
					{
						in: "path",
						name: "id",
						description: "Category ID",
						required: true,
						type: "integer",
						example: 42468,
					},
				],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
					404: {
						description: "Category not found",
					},
				},
			},
		},
		"/tags": {
			get: {
				summary: "Get all tags.",
				tags: ["tags"],
				produces: ["application/json"],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
				},
			},
			post: {
				summary: "Create tag.",
				tags: ["tags"],
				produces: ["application/json"],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					201: {
						description: "Tag created",
						schema: {
							type: "array",
						},
					},
					400: {
						description: "Bad request",
					},
				},
			},
		},
		"/tags/{id}": {
			patch: {
				summary: "Update tag.",
				tags: ["tags"],
				produces: ["application/json"],
				parameters: [
					{
						in: "path",
						name: "id",
						description: "Tag ID",
						required: true,
						type: "integer",
						example: 42468,
					},
				],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
					400: {
						description: "Bad request",
					},
					404: {
						description: "Tag not found",
					},
				},
			},
			delete: {
				summary: "Delete tag.",
				tags: ["tags"],
				produces: ["application/json"],
				parameters: [
					{
						in: "path",
						name: "id",
						description: "Tag ID",
						required: true,
						type: "integer",
						example: 42468,
					},
				],
				security: [
					{
						jwt: [],
					},
				],
				responses: {
					200: {
						description: "Successful operation",
						schema: {
							type: "array",
						},
					},
					404: {
						description: "Tag not found",
					},
				},
			},
		},
	},
	securityDefinitions: {
		jwt: {
			type: "apiKey",
			name: "Authorization",
			in: "header",
			description:
				"Enter the token with the `Bearer: ` prefix, e.g. 'Bearer abcde12345'.",
		},
	},
	definitions: {
		User: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					example: 42468,
				},
				email: {
					type: "string",
					format: "email",
					example: "nom.prenom@gmail.com",
				},
				password: {
					type: "string",
					format: "password",
					example: "password",
				},
				profile_image: {
					type: "string",
					example:
						"https://www.santevet.com/upload/admin/images/article/Chat%202/portrait_chat/les_5_sens_du_chat.jpg",
				},
				createdAt: {
					type: "string",
					example: "2023-01-01T10:35:21.000Z",
				},
				updatedAt: {
					type: "string",
					example: "2023-02-01T17:48:39.000Z",
				},
				snippets: {
					type: "array",
					items: {
						$ref: "#/definitions/Snippet",
					},
				},
				categories: {
					type: "array",
					items: {
						$ref: "#/definitions/Category",
					},
				},
				tags: {
					type: "array",
					items: {
						$ref: "#/definitions/Tag",
					},
				},
			},
		},
		Snippet: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					example: 42468,
				},
				title: {
					type: "string",
					example: "Snippet title",
				},
				content: {
					type: "string",
					example: "Snippet content",
				},
				createdAt: {
					type: "string",
					example: "2023-01-01T10:35:21.000Z",
				},
				updatedAt: {
					type: "string",
					example: "2023-02-01T17:48:39.000Z",
				},
				user_id: {
					type: "integer",
					example: 42468,
				},
				category_id: {
					type: "integer",
					example: 42468,
				},
				tags: {
					type: "array",
					items: {
						$ref: "#/definitions/Tag",
					},
				},
			},
		},
		Category: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					example: 42468,
				},
				name: {
					type: "string",
					example: "Tag",
				},
				user_id: {
					type: "integer",
					example: 42468,
				},
				snippets: {
					type: "array",
					items: {
						$ref: "#/definitions/Snippet",
					},
				},
			},
		},
		Tag: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					example: 42468,
				},
				name: {
					type: "string",
					example: "Tag",
				},
				user_id: {
					type: "integer",
					example: 42468,
				},
				snippets: {
					type: "array",
					items: {
						$ref: "#/definitions/Snippet",
					},
				},
			},
		},
	},
};
