import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Result } from './Result'

vi.mock('../components/ShareButton', () => ({
  ShareButton: () => <div data-testid="share-button" />,
}))

function renderResult(search: string) {
  return render(
    <MemoryRouter initialEntries={[`/result${search}`]}>
      <Routes>
        <Route path="/result" element={<Result />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Result', () => {
  it('renders type code from URL params', () => {
    renderResult('?type=GJEH&s=80-60-90-70')
    expect(screen.getByText('GJEH')).toBeInTheDocument()
  })

  it('renders type name for GJEH', () => {
    renderResult('?type=GJEH&s=80-60-90-70')
    expect(screen.getByText('예약 맛집 탐험가')).toBeInTheDocument()
  })

  it('renders gp percentage from URL params', () => {
    renderResult('?type=GJEH&s=80-60-90-70')
    expect(screen.getByText('80%')).toBeInTheDocument()
  })

  it('shows error message for missing URL params', () => {
    renderResult('?invalid=params')
    expect(screen.getByText(/결과를 불러올 수 없습니다/)).toBeInTheDocument()
  })
})
