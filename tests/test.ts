import { expect, test } from '@playwright/test';

test('cannot reach Immich API', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('could not fetch images')).toBeVisible();
});
