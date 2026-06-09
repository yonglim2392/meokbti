import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Home } from './Home'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...(actual as object), useNavigate: () => mockNavigate }
})

describe('Home', () => {
  it('renders 먹BTI title', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText('먹BTI')).toBeInTheDocument()
  })

  it('renders start button', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText('테스트 시작하기')).toBeInTheDocument()
  })

  it('navigates to /quiz when start button clicked', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    await userEvent.click(screen.getByText('테스트 시작하기'))
    expect(mockNavigate).toHaveBeenCalledWith('/quiz')
  })
})
