import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"


test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL)

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible()

  await page.locator("[name=email]").fill("meer@gmail.com")

  await page.locator("[name=password]").fill("meer@gmail.com")

  await page.getByRole("button", { name: "Login" }).click()

  await expect(page.getByText("Signed In!")).toBeVisible()

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()

});


test('should allow the user to sign up', async ({ page }) => {
  const testEmail = `meer${Math.floor(Math.random() * 9999)}@gmail.com`
  await page.goto(UI_URL)

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible()

  await page.getByRole("link", { name: "Sign up here" }).click();

  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible()

  await page.locator("[name=firstName]").fill("meer")
  await page.locator("[name=lastName]").fill("ashu")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=password]").fill("meer@gmail.com")
  await page.locator("[name=confirmPassword]").fill("meer@gmail.com")

  await page.getByRole("button", { name: "Create Account" }).click()

  await expect(page.getByText("Signed Up!")).toBeVisible()

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()

});

test('should allow the user to sign in then sign out', async ({ page }) => {
  await page.goto(UI_URL)

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible()

  await page.locator("[name=email]").fill("meer@gmail.com")

  await page.locator("[name=password]").fill("meer@gmail.com")

  await page.getByRole("button", { name: "Login" }).click()

  await expect(page.getByText("Signed In!")).toBeVisible()

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()

  await page.getByRole("button", { name: "Sign Out" }).click();

  await expect(page.getByText("Signed Out!")).toBeVisible()

  await expect(page.getByRole("link", { name: "Sign In" })).toBeVisible()

});
