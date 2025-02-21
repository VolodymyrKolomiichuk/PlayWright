import { test, expect } from '@playwright/test';

test('GET /users/id - Checking Response Structure', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/api/users/2`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Checking the main fields of the response
    expect(responseBody).toHaveProperty('data');
    expect(responseBody).toHaveProperty('support');

    // Checking the "data" section
    const user = responseBody.data;
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('avatar');
    expect(user.avatar).toMatch(/^https?:\/\/.+/); // Checking the avatar URL format

    // Checking the "support" section
    const support = responseBody.support;
    expect(support).toHaveProperty('url');
    expect(support).toHaveProperty('text');
});

test('GET /users/id - Response time is less than 5000ms', async ({ request, baseURL }) => {
    const startTime = Date.now();
    const response = await request.get(`${baseURL}/api/users/2`);
    const endTime = Date.now();
    
    expect(endTime - startTime).toBeLessThan(5000); // Check that the response time is less than 5000 ms
});
