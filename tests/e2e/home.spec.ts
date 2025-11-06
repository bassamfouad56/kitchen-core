import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Check that the hero section loads
    await expect(page.locator('h1')).toBeVisible()

    // Verify video is present
    await expect(page.locator('video')).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/')

    // Check navigation items
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()

    // Test navigation clicks
    await nav.getByText(/portfolio/i).click()
    await expect(page.url()).toContain('#portfolio')
  })

  test('should display trust markers', async ({ page }) => {
    await page.goto('/')

    // Check for statistics
    await expect(page.getByText(/150\+/)).toBeVisible()
    await expect(page.getByText(/25\+/)).toBeVisible()
  })

  test('should open mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Click hamburger menu
    const menuButton = page.locator('button[aria-label*="menu" i]')
    await menuButton.click()

    // Mobile menu should be visible
    await expect(page.locator('nav')).toBeVisible()
  })

  test('should have accessible contact form', async ({ page }) => {
    await page.goto('/#contact')

    // Form should be present
    const form = page.locator('form')
    await expect(form).toBeVisible()

    // Check form fields
    await expect(form.locator('input[name="name"]')).toBeVisible()
    await expect(form.locator('input[name="email"]')).toBeVisible()
    await expect(form.locator('textarea')).toBeVisible()
  })
})

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime

    // Page should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    expect(errors).toHaveLength(0)
  })
})

test.describe('SEO', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/')

    // Check meta tags
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(10)

    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(50)
  })
})
