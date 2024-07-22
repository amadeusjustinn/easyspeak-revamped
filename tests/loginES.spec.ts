import { test, expect } from '@playwright/test';

const authFile = './playwright/.auth/user.json';

test("authenticate", async ({ page }) => {
	await page.goto("https://easy-speak.org/portal.php");
	await expect(page.getByText(/The easy-Speak software allows/)).toBeVisible();
	await page.locator("input#username").fill("username");
	await page.locator('input[name="password"]').fill("password");
	await page.getByRole("button", { name: "Log in" }).click();

	await page.waitForURL("https://easy-speak.org/portal.php?marknow=0");
	await expect(page.getByText(/Since 1924/)).toBeVisible();

	// Save auth details in auth file
	await page.context().storageState({ path: authFile });
});
