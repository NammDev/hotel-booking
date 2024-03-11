import { test, expect } from '@playwright/test'

const UI_URL = 'http://localhost:3000/'

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL)

  // get the sign in button
  await page.getByRole('link', { name: 'Sign In' }).click()

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()

  await page.locator('[name=email]').fill('test_register_94673@gmail.com')
  await page.locator('[name=password]').fill('Namkhanh97')

  await page.getByRole('button', { name: 'Sign In' }).click()

  await expect(page.getByText('Login successful 🎉').nth(0)).toBeVisible()

  // await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible()
  // await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible()
})

test('should allow user to register', async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@gmail.com`
  await page.goto(UI_URL)

  await page.getByRole('link', { name: 'Sign In' }).click()
  await page.getByRole('link', { name: 'Sign Up' }).click()
  await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible()

  await page.locator('[name=email]').fill(testEmail)
  await page.locator('[name=firstName]').fill('test_firstName')
  await page.locator('[name=lastName]').fill('test_lastName')
  await page.locator('[name=password]').fill('Namkhanh97')
  await page.locator('[name=confirmPassword]').fill('Namkhanh97')

  await page.getByRole('button', { name: 'Create Account' }).click()

  await expect(page.getByText('Sucessfully registered!').nth(0)).toBeVisible()

  // await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible()
  // await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible()
})
