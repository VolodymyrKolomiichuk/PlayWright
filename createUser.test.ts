import { test, expect } from '@playwright/test';

test('POST /users - Create user with response time', async ({ request, baseURL }) => {
    const payload = {
        name: "morpheus",
        job: "leader"
    };

    const startTime = Date.now(); // Start time
    const apiResponse = await request.post(`${baseURL}/api/users`, { data: payload });
    const endTime = Date.now(); // End time

    const responseTime = endTime - startTime; // Response time in ms
    expect(responseTime).toBeLessThan(5000); // Check that the response time is less than 5000 ms

    expect(apiResponse.status()).toBe(201);

    const responseBody = await apiResponse.json();

    // Checking the main fields of the response
    expect(responseBody).toHaveProperty('name', payload.name);
    expect(responseBody).toHaveProperty('job', payload.job);
    expect(responseBody).toHaveProperty('id');
    expect(typeof responseBody.id).toBe('string');

    // Checking the createdAt field
    expect(responseBody).toHaveProperty('createdAt');
    expect(new Date(responseBody.createdAt).toISOString()).toBe(responseBody.createdAt);
});
