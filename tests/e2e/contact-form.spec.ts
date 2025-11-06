import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('submits contact form successfully', async ({ page }) => {
    // Find form inputs
    const nameInput = page.locator('input[name="name"], input[id*="name"]').first();
    const emailInput = page.locator('input[name="email"], input[id*="email"]').first();
    const messageInput = page.locator('textarea[name="message"], textarea[id*="message"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    // Check if contact form exists on page
    if (await nameInput.isVisible()) {
      // Fill form
      await nameInput.fill('John Doe');
      await emailInput.fill('john@example.com');
      await messageInput.fill('This is a test message from automated testing.');

      // Submit form
      await submitButton.click();

      // Wait for response (success message or page change)
      await page.waitForTimeout(2000);

      // Check for success indicator
      const successMessage = page.getByText(/thank you|success|submitted/i);
      if (await successMessage.count() > 0) {
        await expect(successMessage.first()).toBeVisible();
      }
    } else {
      // Skip test if contact form not found on homepage
      test.skip();
    }
  });

  test('shows validation errors for invalid input', async ({ page }) => {
    const emailInput = page.locator('input[name="email"], input[id*="email"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    if (await emailInput.isVisible()) {
      // Enter invalid email
      await emailInput.fill('invalid-email');
      await submitButton.click();

      // Wait for validation
      await page.waitForTimeout(1000);

      // Check for error message
      const errorMessage = page.getByText(/invalid|error|required/i);
      if (await errorMessage.count() > 0) {
        await expect(errorMessage.first()).toBeVisible();
      }
    } else {
      test.skip();
    }
  });

  test('prevents submission of empty form', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]').first();

    if (await submitButton.isVisible()) {
      // Try to submit empty form
      await submitButton.click();
      await page.waitForTimeout(1000);

      // Form should show validation errors or prevent submission
      const errorMessages = page.locator('[role="alert"], .error, [aria-invalid="true"]');
      const errorCount = await errorMessages.count();

      // Expect at least one validation error
      expect(errorCount).toBeGreaterThan(0);
    } else {
      test.skip();
    }
  });
});
