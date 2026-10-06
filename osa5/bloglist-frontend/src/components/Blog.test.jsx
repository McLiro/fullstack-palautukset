import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'TestTitle',
    url: 'TestUrl',
    author: 'TestAuthor',
    likes: 15
  }

  let handleLike

  beforeEach(() => {
    handleLike = vi.fn()
    render(<Blog blog={blog} handleLike={handleLike} />)
  })

  test('renders title', () => {
    const element = screen.getByText('TestTitle')
    expect(element).toBeDefined()
  })

  test('url, likes and user rendered after clicking view', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('TestUrl')).toBeVisible()
    expect(screen.getByText('TestAuthor')).toBeVisible()
    expect(screen.getByText('likes 15')).toBeVisible()
  })

  test('function gets called twice when user presses like twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
