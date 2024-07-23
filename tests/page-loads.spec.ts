import { test, expect } from "@playwright/test";

test("has heading", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const heading = page.locator("h1").first();

  await expect(heading).toContainText("Placeholder Posts");
});

test("loading state", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const loading = page.locator("#spinner");

  await expect(loading).toHaveClass(/animate-spin/);
});
