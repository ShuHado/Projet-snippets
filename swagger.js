export default {
	swagger: "2.0",
	info: {
		description: "A fake API about artists.",
		version: "1.0.0",
		title: "ArtistsAPI",
	},
	basePath: "/v1",
	tags: [
		{
			name: "account",
			name: "categories",
			name: "tags",
			name: "snippets",
		},
	],
	paths: {
		"/categories": {
			get: {
				summary: "Get all categories with pagination.",
				tags: ["categories"],
				produces: ["application/json"],
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
};
