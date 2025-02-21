import { test, expect } from '@playwright/test';



test('POST /users - Missing payload', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/api/users`, {
        data: {} // Empty payload
    });

    expect(response.status()).toBe(400); // API should return an error (or 422, depending on the implementation)
});