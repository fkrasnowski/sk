import { test, expect } from "@playwright/test";

test("has posts", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const postsHeading = page.locator("h2").nth(1);

  await expect(postsHeading).toContainText("Posts");

  const posts = page.getByTestId("post");
  await expect(posts).toHaveCount(100);

  const firstPost = posts.first();
  await expect(firstPost).toContainText("Leanne Graham");

  const lastPost = posts.last();
  await expect(lastPost).toContainText("Clementina DuBuque");
});

test("has only selected posts", async ({ page }) => {
  await page.goto("http://localhost:4173/?userId=1");

  const posts = page.getByTestId("post");
  await expect(posts).toHaveCount(10);

  const firstPost = posts.first();
  await expect(firstPost).toContainText("Leanne Graham");

  const lastPost = posts.last();
  await expect(lastPost).toContainText("Leanne Graham");
});

test("posts change in response to user selection", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const posts = page.getByTestId("post");
  await expect(posts).toHaveCount(100);

  const firstPost = posts.first();
  await expect(firstPost).toContainText("Leanne Graham");

  const ervinCheckboxLabel = page.getByLabel("Ervin Howell").first();

  await ervinCheckboxLabel.check({ force: true });

  await expect(firstPost).toContainText("Ervin Howell");
});
