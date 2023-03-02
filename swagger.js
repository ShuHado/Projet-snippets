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
					},
					401: {
						description: "Error: Unauthorized",
					},
					404: {
						description: "Category not found",
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
				parameters: [
					{
						name: "snippet",
						in: "body",
						description: "Snippet infos",
						required: true,
						schema: {
							$ref: "#/definitions/SnippetPost",
						},
					},
				],
				responses: {
					201: {
						description: "Category created",
						schema: {
							$ref: "#/definitions/Snippet",
						},
					},
					400: {
						description: "Bad request",
					},
					401: {
						description: "Error: Unauthorized",
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
					},
					401: {
						description: "Error: Unauthorized",
					},
					404: {
						description: "Snippet not found",
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
					},
					400: {
						description: "Bad request",
					},
					401: {
						description: "Error: Unauthorized",
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
					401: {
						description: "Error: Unauthorized",
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
					},
					401: {
						description: "Error: Unauthorized",
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
				parameters: [
					{
						name: "name",
						in: "formData",
						description: "Category name",
						required: true,
					},
				],
				responses: {
					201: {
						description: "Category created",
						schema: {
							$ref: "#/definitions/Category",
						},
					},
					400: {
						description: "Bad request",
					},
					401: {
						description: "Error: Unauthorized",
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
							$ref: "#/definitions/Category",
						},
					},
					400: {
						description: "Bad request",
					},
					401: {
						description: "Error: Unauthorized",
					},
					404: {
						description: "Category not found",
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
					401: {
						description: "Error: Unauthorized",
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
							$ref: "#/definitions/Tag",
						},
					},
					401: {
						description: "Error: Unauthorized",
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
				parameters: [
					{
						name: "name",
						in: "formData",
						description: "Tag name",
						required: true,
					},
				],
				responses: {
					201: {
						description: "Tag created",
						schema: {
							$ref: "#/definitions/Tag",
						},
					},
					400: {
						description: "Bad request",
					},
					401: {
						description: "Error: Unauthorized",
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
							$ref: "#/definitions/Tag",
						},
					},
					400: {
						description: "Bad request",
					},
					401: {
						description: "Error: Unauthorized",
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
							$ref: "#/definitions/Tag",
						},
					},
					401: {
						description: "Error: Unauthorized",
					},
					404: {
						description: "Tag not found",
					},
				},
			},
		},
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
							$ref: "#/definitions/Account",
						},
					},
					401: {
						description: "Error: Unauthorized",
					},
				},
			},
			patch: {
				summary: "Update account.",
				tags: ["account"],
				produces: ["application/json"],
				parameters: [
					{
						name: "email",
						in: "formData",
						description: "Account email",
						required: false,
					},
					{
						name: "password",
						in: "formData",
						description: "Account password",
						required: false,
					},
					{
						name: "profileImage",
						in: "formData",
						description: "Account profile image",
						required: false,
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
							$ref: "#/definitions/Account",
						},
					},
					400: {
						description: "Bad request",
					},
				},
			},
		},
		"/account/register": {
			post: {
				summary: "Register account.",
				tags: ["account"],
				produces: ["application/json"],
				parameters: [
					{
						name: "email",
						in: "formData",
						description: "Account email",
						required: true,
						uniqueItems: true,
					},
					{
						name: "password",
						in: "formData",
						description: "Account password",
						required: true,
					},
					{
						name: "profileImage",
						in: "formData",
						description: "Account profile image",
						required: false,
					},
				],
				responses: {
					201: {
						description: "Account created",
						schema: {
							$ref: "#/definitions/Account",
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
				parameters: [
					{
						name: "email",
						in: "formData",
						description: "Account email",
						required: true,
					},
					{
						name: "password",
						in: "formData",
						description: "Account password",
						required: true,
					},
				],
				responses: {
					200: {
						description: "Account logged in",
					},
					403: {
						description: "Bad email or password",
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
		SnippetPost: {
			type: "object",
			properties: {
				title: {
					type: "string",
					example: "Snippet title",
				},
				content: {
					type: "string",
					example: "Snippet content",
				},
				category_id: {
					type: "integer",
					example: 42468,
				},
				tags: {
					type: "array",
					items: {
						type: "integer",
						format: "int64",
						example: 42468,
					},
					minItems: 1,
					example: [42468, 42469],
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
		Account: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					format: "int64",
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
			},
		},
	},
};
