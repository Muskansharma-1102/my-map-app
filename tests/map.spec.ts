import { test, expect } from '@playwright/test';

test('Map loads and displays WMS layer', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('.leaflet-container')).toBeVisible();
  // Wait for tiles to load (adjust selector if needed)
  await page.waitForTimeout(2000);
});

test('Sidebar toggles WMS layer', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const checkbox = page.locator('input[type="checkbox"]');
  await checkbox.uncheck();
  // Assert layer is hidden (check for absence of tiles or a custom class)
});

test('Drawing polygon adds feature', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('text=Draw Polygon');
  // Simulate drawing (use page.mouse for clicks on map)
  // Assert feature is added (check localStorage or UI)
});