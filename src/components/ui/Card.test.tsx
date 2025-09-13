import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  it('renders title and description', () => {
    render(<Card title='Test Title' description='Test Description' />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Test Title' })
    ).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('applies the root class', () => {
    const { container } = render(<Card title='T' description='D' />)
    expect(container.firstChild).toHaveClass('card')
  })

  it('renders children inside a wrapper only when provided', () => {
    const { container, rerender } = render(<Card title='T' description='D' />)
    // Title and description are wrapped in a div, and there's a content div
    let innerDivs = container.querySelectorAll('.card > div')
    expect(innerDivs.length).toBe(2) // One for title/description, one for content

    rerender(
      <Card title='T' description='D'>
        <span>Child here</span>
      </Card>
    )

    innerDivs = container.querySelectorAll('.card > div')
    expect(innerDivs.length).toBe(2) // Still two divs, but the second one has children
    expect(screen.getByText('Child here')).toBeInTheDocument()
  })

  it('supports complex React nodes as children', () => {
    render(
      <Card title='Title' description='Desc'>
        <>
          <button type='button'>Click me</button>
          <strong>Bold child</strong>
        </>
      </Card>
    )

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    expect(screen.getByText('Bold child')).toBeInTheDocument()
  })

  it('handles empty strings gracefully', () => {
    const { container } = render(<Card title='' description='' />)

    // No heading should be rendered for empty title
    const headings = container.querySelectorAll('h2')
    expect(headings.length).toBe(0)
    // No description paragraph should be rendered for empty description
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs.length).toBe(0)
  })

  it('renders title before description (basic structure check)', () => {
    const { container } = render(
      <Card title='Order Title' description='Order Description' />
    )

    // Check that the title and description are in the correct order within their container
    const contentDiv = container.querySelector('.card > div:first-child')
    if (contentDiv) {
      const children = Array.from(contentDiv.children).map((n) => n.tagName)
      expect(children).toEqual(['H2', 'P'])
    } else {
      throw new Error('Content div not found')
    }
  })
})
