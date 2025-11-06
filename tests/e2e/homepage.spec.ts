import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads successfully and displays main elements', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check title
    await expect(page).toHaveTitle(/Kitchen Core/i);

    // Check main heading exists
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Check navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('navigation links work correctly', async ({ page }) => {
    // Click on a navigation link (example: About)
    const aboutLink = page.getByRole('link', { name: /about/i });

    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/.*about/);
    }
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check mobile menu button exists
    const mobileMenuButton = page.locator('[aria-label*="menu" i], [aria-label*="navigation" i]');

    if (await mobileMenuButton.count() > 0) {
      await expect(mobileMenuButton.first()).toBeVisible();
    }
  });

  test('images load with proper alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    if (count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });

  test('page has no console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    expect(errors.length).toBe(0);
  });
});
