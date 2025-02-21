import { test, expect } from '@playwright/test';

const invalidUserId = 99999; // Invalid user ID 
const invalidPayloads = [
    { name: "", job: "zion resident" },  // Empty name
    { name: "morpheus", job: "" },  // Empty job
    { name: 123, job: "zion resident" }, // Numeric name
    { name: "morpheus" }, // Empty job field
    {} // Empty payload
];

test('PUT /users/invalid_id - Updating a non-existing user', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/api/users/${invalidUserId}`, {
        data: { name: "morpheus", job: "zion resident" }
    });

    expect(response.status()).toBe(404); // We expect 404 Not Found
});

test('PUT /users/2 - Invalid payloads should return 400', async ({ request, baseURL }) => {
    for (const payload of invalidPayloads) {
        const response = await request.put(`${baseURL}/api/users/2`, {
            data: payload
        });

        expect(response.status()).toBe(400); // Waiting for 400 Bad Request for all payloads
    }
});
