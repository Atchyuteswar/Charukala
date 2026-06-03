import { test, expect } from '@playwright/test';

const pagesToTest = [
  { name: 'Home', url: '/' },
  { name: 'Products', url: '/products' },
  { name: 'Cart', url: '/cart' },
  { name: 'Virtual Try-On', url: '/virtual-tryon' },
];

for (const p of pagesToTest) {
  test(`Responsive Check: ${p.name} page should load and render navbar`, async ({ page, isMobile }) => {
    
    // Listen for console errors during rendering
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(p.url);
    
    // Ensure no Next.js hydration errors occurred
    expect(errors).not.toContain('Warning: Text content did not match. Server:');
    
    // Verify Navbar is present
    const navbar = page.locator('header').first();
    await expect(navbar).toBeVisible();

    // Verify Mobile/Desktop specific navbar constraints
    if (isMobile) {
      // Hamburger menu should be visible on mobile
      const hamburger = page.getByRole('button', { name: 'Open menu' });
      await expect(hamburger).toBeVisible();
      
      // Test opening the menu
      await hamburger.click();
      const closeMenu = page.getByRole('button', { name: 'Close menu' });
      await expect(closeMenu).toBeVisible();
      
      // Close the menu
      await closeMenu.click();
    } else {
      // Desktop nav links should be visible on desktop
      const collectionsLink = page.getByRole('link', { name: 'Collections' }).nth(0);
      await expect(collectionsLink).toBeVisible();
      
      // Hamburger menu should NOT be visible on desktop
      const hamburger = page.getByRole('button', { name: 'Open menu' });
      await expect(hamburger).toBeHidden();
    }
  });
}
