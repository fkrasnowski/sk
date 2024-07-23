import { test, expect } from "@playwright/test";

test("has users", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const userHeading = page.locator("h2").first();

  await expect(userHeading).toContainText("Users");

  const allCheckbox = page.getByLabel("All").locator("input");
  const leanneCheckbox = page.getByLabel("Leanne Graham").locator("input");

  await expect(allCheckbox).toBeChecked();
  await expect(leanneCheckbox).not.toBeChecked();
});

test("has user 1 and user 2 selected", async ({ page }) => {
  await page.goto("http://localhost:4173/?userId=1&userId=2");

  const checkbox = page.locator('input[type="checkbox"][checked]');

  await expect(checkbox).toHaveCount(2);

  const allCheckbox = page.getByLabel("All").locator("input");
  const ervinCheckbox = page.getByLabel("Ervin Howell").locator("input");
  const leanneCheckbox = page.getByLabel("Leanne Graham").locator("input");

  await expect(leanneCheckbox).toBeChecked();
  await expect(ervinCheckbox).toBeChecked();
  await expect(allCheckbox).not.toBeChecked();
});

test("search parameters are updating", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const leanneCheckbox = page.getByLabel("Leanne Graham").first();

  await leanneCheckbox.check({ force: true });

  await expect(page).toHaveURL("http://localhost:4173/?userId=1");
});
