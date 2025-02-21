import { test, expect } from '@playwright/test';

test('GET /users - checking response', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/api/users?page=2`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Checking main fields of the response
    expect(responseBody).toHaveProperty('page');
    expect(responseBody).toHaveProperty('per_page');
    expect(responseBody).toHaveProperty('total');
    expect(responseBody).toHaveProperty('total_pages');
    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0); // Checking that the list is not empty

    // Checking the first user in the list
    const firstUser = responseBody.data[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('email');
    expect(firstUser).toHaveProperty('first_name');
    expect(firstUser).toHaveProperty('last_name');
    expect(firstUser).toHaveProperty('avatar');

    // Checking the email format
    expect(firstUser.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    // Checking the support field
    expect(responseBody).toHaveProperty('support');
    expect(responseBody.support).toHaveProperty('url');
    expect(responseBody.support).toHaveProperty('text');
});
