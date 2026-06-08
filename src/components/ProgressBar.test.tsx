import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('shows current and total', () => {
    render(<ProgressBar current={5} total={20} />)
    expect(screen.getByText('5 / 20')).toBeInTheDocument()
  })

  it('renders progress fill with correct width', () => {
    const { container } = render(<ProgressBar current={10} total={20} />)
    const fill = container.querySelector('[data-testid="progress-fill"]')
    expect(fill).toHaveStyle({ width: '50%' })
  })
})
