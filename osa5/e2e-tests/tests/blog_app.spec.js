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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Someone Else',
        username: 'sElse',
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
      await page.getByRole('button', { name: 'view' }).click()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('creator can delete blog', async ({ page }) => {
      page.once('dialog', async (dialog) => {
        const message = dialog.message()
        await dialog.accept()
        expect(message).toBe('Remove blog testTitle by testAuthor?')
      })

      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('removed testTitle')).toBeVisible()
    })

    test('other user cannot see remove button', async ({ page }) => {
      await page.getByRole('button', { name: 'log out' }).click()
      await page.getByRole('textbox', { name: 'username' }).fill('sElse')
      await page.getByRole('textbox', { name: 'password' }).fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })

    test('blogs are ordered by likes descending', async ({ page }) => {
      for (const name of ['second', 'third']) {
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByLabel('title:').fill(`${name}Title`)
        await page.getByLabel('author:').fill(`${name}Author`)
        await page.getByLabel('url:').fill(`${name}Url`)
        await page.getByRole('button', { name: 'Create' }).click()
      }

      const blogByTitle = (title) =>
        page.getByTestId('blog').filter({ hasText: title })

      const secondBlog = blogByTitle('secondTitle')
      await secondBlog.getByRole('button', { name: 'view' }).click()
      await secondBlog.getByRole('button', { name: 'like' }).click()
      await expect(secondBlog.getByTestId('likes')).toHaveText('likes 1')
      await secondBlog.getByRole('button', { name: 'like' }).click()
      await expect(secondBlog.getByTestId('likes')).toHaveText('likes 2')

      const thirdBlog = blogByTitle('thirdTitle')
      await thirdBlog.getByRole('button', { name: 'view' }).click()
      await thirdBlog.getByRole('button', { name: 'like' }).click()
      await expect(thirdBlog.getByTestId('likes')).toHaveText('likes 1')

      const likes = await page.getByTestId('likes').allTextContents()
      const counts = likes.map((t) => Number(t.match(/\d+/)[0]))
      expect(counts).toEqual([2, 1, 0])
    })
  })
})
