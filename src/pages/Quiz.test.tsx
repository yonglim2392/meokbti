import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Quiz } from './Quiz'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...(actual as object), useNavigate: () => mockNavigate }
})

describe('Quiz', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })
  it('renders the first question progress indicator', () => {
    render(<MemoryRouter><Quiz /></MemoryRouter>)
    expect(screen.getByText('1 / 20')).toBeInTheDocument()
  })

  it('advances to question 2 after answering question 1', async () => {
    render(<MemoryRouter><Quiz /></MemoryRouter>)
    await userEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByText('2 / 20')).toBeInTheDocument()
  })

  it('navigates to /result after answering all 20 questions', async () => {
    render(<MemoryRouter><Quiz /></MemoryRouter>)
    for (let i = 0; i < 20; i++) {
      await userEvent.click(screen.getAllByRole('button')[0])
    }
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringMatching(/^\/result\?type=/)
    )
  })

  it('double-click guard: rapid clicks advance only one question', async () => {
    render(<MemoryRouter><Quiz /></MemoryRouter>)
    const btn = screen.getAllByRole('button')[0]
    // Wrap in act() so React batches updates — all three clicks fire before any re-render
    act(() => {
      fireEvent.click(btn)
      fireEvent.click(btn)
      fireEvent.click(btn)
    })
    expect(await screen.findByText('2 / 20')).toBeInTheDocument()
  })
})
