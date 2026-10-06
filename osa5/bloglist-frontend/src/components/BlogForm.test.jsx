import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let handleNewBlog

  beforeEach(() => {
    handleNewBlog = vi.fn()
    render(<BlogForm handleNewBlog={handleNewBlog} />)
  })

  test('handleNewBlog is called with correct information when creating blog', async () => {
    const user = userEvent.setup()

    await user.type(screen.getByLabelText('title:'), 'TestTitle')
    await user.type(screen.getByLabelText('author:'), 'TestAuthor')
    await user.type(screen.getByLabelText('url:'), 'TestUrl')

    await user.click(screen.getByText('Create'))

    expect(handleNewBlog).toHaveBeenCalledTimes(1)
    expect(handleNewBlog).toHaveBeenCalledWith({
      title: 'TestTitle',
      author: 'TestAuthor',
      url: 'TestUrl'
    })
  })
})
