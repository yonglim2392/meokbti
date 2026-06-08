import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ResultChart } from './ResultChart'

describe('ResultChart', () => {
  const scores = { gp: 80, js: 60, er: 90, hm: 70 }

  it('renders A-side axis labels', () => {
    render(<ResultChart scores={scores} />)
    expect(screen.getByText('미식')).toBeInTheDocument()
    expect(screen.getByText('계획')).toBeInTheDocument()
    expect(screen.getByText('탐험')).toBeInTheDocument()
    expect(screen.getByText('자극')).toBeInTheDocument()
  })

  it('renders B-side axis labels', () => {
    render(<ResultChart scores={scores} />)
    expect(screen.getByText(/실용/)).toBeInTheDocument()
    expect(screen.getByText(/즉흥/)).toBeInTheDocument()
    expect(screen.getByText(/단골/)).toBeInTheDocument()
    expect(screen.getByText(/순한/)).toBeInTheDocument()
  })

  it('renders A-side percentage values', () => {
    render(<ResultChart scores={scores} />)
    expect(screen.getByText('80%')).toBeInTheDocument()
    expect(screen.getByText('60%')).toBeInTheDocument()
    expect(screen.getByText('90%')).toBeInTheDocument()
    expect(screen.getByText('70%')).toBeInTheDocument()
  })
})
