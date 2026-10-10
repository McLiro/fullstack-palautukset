const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.locator('form')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
      await page.getByRole('textbox', { name: 'password' }).fill('salainen')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
      await page.getByRole('textbox', { name: 'password' }).fill('wrong')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('invalid credentials')).toBeVisible()
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
      await page.getByRole('textbox', { name: 'password' }).fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await page.getByLabel('title:').fill('testTitle')
      await page.getByLabel('author:').fill('testAuthor')
      await page.getByLabel('url:').fill('testUrl')
      await page.getByRole('button', { name: 'Create' }).click()

      await expect(page.getByText('a new blog testTitle by')).toBeVisible()
      await expect(page.getByText('testTitle view')).toBeVisible()
    })
  })

  describe('When blogs have been posted', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
      await page.getByRole('textbox', { name: 'password' }).fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await page.getByLabel('title:').fill('testTitle')
      await page.getByLabel('author:').fill('testAuthor')
      await page.getByLabel('url:').fill('testUrl')
      await page.getByRole('button', { name: 'Create' }).click()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })
})
