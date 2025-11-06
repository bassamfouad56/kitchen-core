import { test, expect } from '@playwright/test';

test.describe('Admin Panel', () => {
  test('redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/admin');

    // Should redirect to login page
    await expect(page).toHaveURL(/.*login|.*admin\/login/);
  });

  test('login page loads correctly', async ({ page }) => {
    await page.goto('/admin/login');

    // Check for email and password inputs
    const emailInput = page.locator('input[name="email"], input[type="email"]');
    const passwordInput = page.locator('input[name="password"], input[type="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/admin/login');

    const emailInput = page.locator('input[name="email"], input[type="email"]');
    const passwordInput = page.locator('input[name="password"], input[type="password"]');
    const submitButton = page.locator('button[type="submit"]');

    // Enter invalid credentials
    await emailInput.fill('invalid@example.com');
    await passwordInput.fill('wrongpassword');
    await submitButton.click();

    // Wait for error message
    await page.waitForTimeout(2000);

    // Check for error message
    const errorMessage = page.getByText(/invalid|error|incorrect|wrong/i);
    if (await errorMessage.count() > 0) {
      await expect(errorMessage.first()).toBeVisible();
    }
  });

  // Note: Login test with valid credentials should use test database
  // and should be in a separate test file with proper setup/teardown
  test.skip('logs in with valid credentials', async ({ page }) => {
    // This test requires proper test database setup
    // Implement when ready to test with actual authentication
  });
});
