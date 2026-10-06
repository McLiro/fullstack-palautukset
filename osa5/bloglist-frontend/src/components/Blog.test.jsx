import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, expect } from 'vitest'

describe('<Blog />', () => {
  const blog = {
    title: 'TestTitle',
    url: 'TestUrl',
    author: 'TestAuthor',
    likes: 15
  }

  beforeEach(() => {
    render(<Blog blog={blog} />)
  })

  test('renders title', () => {
    const element = screen.getByText('TestTitle')
    expect(element).toBeDefined()
  })
})
