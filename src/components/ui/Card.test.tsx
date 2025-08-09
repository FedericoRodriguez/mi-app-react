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
    // No children wrapper rendered
    // structure: <div.card><h2 /><p /></div>
    let innerDivs = container.querySelectorAll('.card > div')
    expect(innerDivs.length).toBe(0)

    rerender(
      <Card title='T' description='D'>
        <span>Child here</span>
      </Card>
    )

    innerDivs = container.querySelectorAll('.card > div')
    expect(innerDivs.length).toBe(1) // now the children wrapper exists
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
    render(<Card title='' description='' />)

    // Heading exists but has empty text
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    // The <p> is present even if empty
    const paragraphs = screen.getAllByText((_, el) => el?.tagName === 'P')
    expect(paragraphs.length).toBe(1)
  })

  it('renders title before description (basic structure check)', () => {
    const { container } = render(
      <Card title='Order Title' description='Order Description' />
    )

    const root = container.querySelector('.card')!
    const children = Array.from(root.children).map((n) => n.tagName)
    expect(children.slice(0, 2)).toEqual(['H2', 'P'])
  })
})
