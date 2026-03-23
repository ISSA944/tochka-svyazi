import { expect, test, type Page } from "@playwright/test";

const PRELOADER_SESSION_KEY = "tochka-svyazi-preloader-seen";

const openLanding = async (page: Page) => {
  await page.addInitScript((storageKey: string) => {
    window.sessionStorage.setItem(storageKey, "1");
  }, PRELOADER_SESSION_KEY);

  await page.goto("/");
};

test.describe("Landing page", () => {
  test("renders the main sections and exposes WhatsApp CTA", async ({ page }) => {
    await openLanding(page);

    await expect(page.getByRole("heading", { name: /главная точка технологий/i })).toBeVisible();
    const heroCta = page.getByRole("link", { name: /перейти в whatsapp/i });
    await expect(heroCta).toBeVisible();
    await expect(heroCta).toHaveAttribute("href", /wa\.me/);
    await expect(heroCta).toHaveAttribute("target", "_blank");
    await expect(page.getByRole("heading", { name: /наши преимущества/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /всё лучшее/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /обменяй старый/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /наши магазины/i })).toBeVisible();
  });

  test("supports in-page navigation from the header", async ({ page }, testInfo) => {
    await openLanding(page);
    const isMobileProject = testInfo.project.name.includes("mobile");

    if (isMobileProject) {
      await page.getByRole("button", { name: /открыть меню/i }).click();
      await page.getByRole("dialog").getByRole("link", { name: "Каталог" }).click();
    } else {
      await page.getByRole("navigation").getByRole("link", { name: "Каталог" }).click();
    }
    await expect(page.locator("#catalog")).toBeInViewport();

    if (isMobileProject) {
      await page.getByRole("button", { name: /открыть меню/i }).click();
      await page.getByRole("dialog").getByRole("link", { name: "Контакты" }).click();
    } else {
      await page.getByRole("navigation").getByRole("link", { name: "Контакты" }).click();
    }
    await expect(page.locator("#locations")).toBeInViewport();
  });
});

test.describe("Mobile experience", () => {
  test("opens mobile navigation and shows compact call-to-action layout", async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes("mobile"), "Mobile-only scenario");

    await openLanding(page);

    await page.getByRole("button", { name: /открыть меню/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("link", { name: "Каталог" })).toBeVisible();

    await page.getByRole("link", { name: "Trade-In" }).click();
    await expect(page.locator("#tradein")).toBeInViewport();

    await expect(page.getByRole("link", { name: /написать в whatsapp/i })).toBeVisible();
  });
});
