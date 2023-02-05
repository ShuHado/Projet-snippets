import { it, describe, expect } from "vitest";
import request from "supertest";
import { app } from "../app";

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1NjIxNTU4LCJleHAiOjE2NzU3Mjk1NTh9.1nULMkDmOg3Chataadws8uQ6HC_zJ3VSOTmWQL76Qy8";

// je décris sur quel endpoint je tape
describe("GET /v1/snippets/11", () => {
	// on décrit ensuite ce qu'on teste
	it("responds with the correct JSON data", async () => {
		const response = await request(app)
			.get("/v1/snippets/11")
			.set({ Authorization: `Bearer ${token}` })
			.expect("Content-Type", "application/json; charset=utf-8")
			.expect(200);

		expect(response.body.title).toEqual("Ratio Florian");
		expect(response.body.content).toEqual("ratio");
		expect(response.body.user_id).toEqual(2);
		expect(response.body.category_id).toEqual(6);
	});
});

describe("POST /v1/snippets", () => {
	// on décrit ensuite ce qu'on teste
	it("create with the correct JSON data", async () => {
		const data = {
			title: "test",
			content: "test",
			category_id: 6,
			tags: [3, 10],
		};
		const response = await request(app)
			.post("/v1/snippets")
			.set({ Authorization: `Bearer ${token}` })
			.send(data)
			.expect("Content-Type", "application/json; charset=utf-8")
			.expect(201);

		expect(response.body.title).toEqual(data.title);
		expect(response.body.content).toEqual(data.content);
		expect(response.body.category_id).toEqual(data.category_id);
	});
});
