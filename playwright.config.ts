import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './', // Path to the test files
  use: {
    headless: true, // Can be set to false to see the browser in action
    baseURL: 'https://reqres.in', // Base URL for all tests
  },
});
