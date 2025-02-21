import { test, expect } from '@playwright/test';

test('Перевірка GET-запиту до API', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
  
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('id', 1);
});
